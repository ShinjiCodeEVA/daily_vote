import { ResultSetHeader } from "mysql2";
import { VoteModel } from "../../types/models.js";
import Database from "../index.js";

class Vote {
    
    public static findOne(choiceId: number): Promise<VoteModel> { 
        return new Promise(async (resolve, reject) => { 
            const db = Database.getInstance();

            try { 
                const queryString = `SELECT COUNT(*) AS vote_count 
                                     FROM votes
                                     WHERE choice_id = ?`

                const result = await db.query<VoteModel>(queryString, [choiceId]);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static insert(vote: VoteModel): Promise<ResultSetHeader> { 
        return new Promise(async (resolve, reject) => { 
            const db = await Database.getConnection();

            try { 
                const {userId, pollId, choiceId} = vote;
                
                const queryString = `INSERT INTO votes (user_id, poll_id, choice_id)
                                     VALUES (?, ?, ?)`

                const [fields] = await db.query<ResultSetHeader>(queryString, [userId, pollId, choiceId]);
                resolve(fields);

            } catch (error) { 
                reject(error);
            }
        })
    }
}

export default Vote;