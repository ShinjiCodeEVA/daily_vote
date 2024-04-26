import { UserModel } from "../../types/models.js";
import Database from "../index.js";
import { ResultSetHeader } from "mysql2";

class User { 
    
    /**
     * GET all users 
     * @returns UserModel[]
     */
    public static getAll(): Promise<UserModel[]> {
        return new Promise(async (resolve, reject) => { 
            const db = Database.getInstance();

            try { 
                const queryString = `SELECT * FROM users`

                const result = await db.query<UserModel[]>(queryString, []);
                resolve(result);

            } catch(error) {
                reject(error);
            }
        })
    } 

    /**
     * GET a single user
     * @param userId 
     * @returns UserModel
     */
    public static findOne(userId: number): Promise<UserModel> { 
        return new Promise(async (resolve, reject) => { 
            const db = Database.getInstance();

            try { 
                const queryString = `SELECT * FROM users 
                                     WHERE user_id = ?`

                const result = await db.query<UserModel>(queryString, [userId]);
                resolve(result);

            } catch(error) {
                reject(error);
            }
        })
    }

    /**
     * INSERT a single user 
     * @param user 
     * @returns ResultHeader
     */
    public static insert(user: UserModel): Promise<ResultSetHeader> { 
        return new Promise(async (resolve, reject) => { 
            const db = await Database.getConnection();
            
            try { 
                const error = User.validate(user)
                if (error)  
                    reject(error);

                const {accessToken, username} = user;
                    
                const queryString = `INSERT INTO users (access_token, username) 
                                     VALUES (?, ?)`

                const [fields] = await db.query<ResultSetHeader>(queryString, [accessToken, username]);
                resolve(fields);

            } catch(error) {
                reject(error);
            }
        })
    }

    /**
     * VALIDATE user
     * @param user 
     */
    private static validate(user: UserModel) { 
        if (!user.accessToken) return ['Access Token is required'];
        if (!user.username) return ['Username is required'];
    }
}

export default User;