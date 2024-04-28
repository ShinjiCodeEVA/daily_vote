import { ResultSetHeader } from "mysql2";
import { PollModel } from "../../types/models.js";
import { PollState } from "../../types/enums.js";
import Database from "../index.js";


class Poll {
    
    /**
     * GET all polls 
     * @returns PollModel[]
     */
    public static getAll(state: string): Promise<PollModel[]> {
        return new Promise(async (resolve, reject) => { 
            const db = Database.getInstance();

            try {
                let queryString = `SELECT
                                         p.*,
                                         JSON_ARRAYAGG(JSON_OBJECT('choiceId', c.choice_id, 'choiceName', c.choice_name)) AS choices,
                                         JSON_OBJECT('user_id', u.user_id, 'access_token', u.access_token, 'username', u.username, 'user_profile', u.user_profile) AS user
                                     FROM
                                         polls p
                                     LEFT JOIN
                                         choices c ON p.poll_id = c.poll_id
                                     LEFT JOIN 
                                         users as u ON (p.user_id = u.user_id) 
                                     GROUP BY
                                         p.poll_id`;

                // check if active polls
                if (state === PollState.ACTIVE) { 
                    queryString += ` HAVING p.expiration_date > NOW()`
                } else if (state === PollState.EXPIRED) { 
                    queryString += ` HAVING p.expiration_date < NOW()`
                }                                    

                const polls = await db.query<PollModel[]>(queryString, []);
                resolve(polls);

            } catch (error) {
                reject(error);
            }
        })
    }  

    /**
     * GET a single poll
     * @param pollId 
     * @returns PollModel
     */
    public static findOne(pollId: number): Promise<PollModel> { 
        return new Promise(async (resolve, reject) => { 
            const db = Database.getInstance();

            try {
                const queryString = `SELECT 
                                         p.*,
                                         JSON_ARRAYAGG(JSON_OBJECT('choiceId', c.choice_id, 'choiceName', c.choice_name)) as choices,
                                         JSON_OBJECT('user_id', u.user_id, 'access_token', u.access_token, 'username', u.username, 'user_profile', u.user_profile) as user
                                     FROM polls p
                                     LEFT JOIN 
                                        choices as c ON (p.poll_id = c.poll_id)
                                     LEFT JOIN 
                                        users as u ON (p.user_id = u.user_id) 
                                     WHERE 
                                        p.poll_id = (?)
                                     GROUP BY 
                                        p.poll_id`; 
                                     

                const poll = await db.query<PollModel>(queryString, [pollId]);
                resolve(poll);

            } catch (error) {
                reject(error);
            }
        })        
    }

    /**
     * INSERT a single poll
     * @param poll 
     * @returns ResultSetHeader
     */
    public static insert(poll: PollModel): Promise<void> {
        return new Promise(async (resolve, reject) => { 
            const db = await Database.getConnection();

            try {
                const error = Poll.validate(poll);
                if (error)
                    reject(error);

                const {userId, pollName, expirationDate, choices} = poll;
                
                const queryString = `INSERT INTO polls (user_id, poll_name, expiration_date )
                                     VALUES (?, ?, ?)`;

                // insert into polls
                const [fields] = await db.query<ResultSetHeader>(queryString, [userId, pollName, expirationDate]);
                
                // get the poll id
                const pollId = fields.insertId;

                // loop through the choices and insert into choices
                for (const choice of choices) { 
                    await db.query(
                        `INSERT INTO choices (poll_id, choice_name)
                         VALUES (?, ?)`
                    , [pollId, choice]);
                }
                
                resolve();

            } catch (error) {
                reject(error);
            }
        })      
    }


    /**
     * VALIDATE poll
     * @param poll 
     */
    private static validate(poll: PollModel) { 
        if (!poll.userId) return ['User id is required'];
        if (!poll.pollName) return ['Poll name is required'];
        if (!poll.expirationDate) return ['Expiration date is required'];
    }
    
}


export default Poll;