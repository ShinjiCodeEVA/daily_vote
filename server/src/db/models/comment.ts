import { ResultSetHeader } from "mysql2";
import { CommentModel } from "../../types/models.js";
import Database from "../index.js";

class Comment {
    
    /**
     * GET comments in a specific poll 
     * @param pollId 
     * @returns CommentModel[]
     */
    public static getAll(pollId: number): Promise<CommentModel[]> {
        return new Promise(async (resolve, reject) => {
            const db = Database.getInstance();

            try { 
                const queryString = `SELECT * FROM comments
                                     WHERE poll_id = ? `
                
                const comments = await db.query<CommentModel[]>(queryString, [pollId]);
                resolve(comments);                     
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * INSERT a comment
     * @param userId 
     * @param pollId 
     * @param commentTitle 
     * @returns ResultSetHeader
     */
    public static insert(comment: CommentModel): Promise<ResultSetHeader> { 
        return new Promise(async (resolve, reject) => { 
            const db = await Database.getConnection();

            try { 
                const {userId, pollId, commentTitle} = comment;
                
                const queryString = `INSERT INTO comments (user_id, poll_id, comment_title)
                                     VALUES (?, ?, ?)`

                const [fields] = await db.query<ResultSetHeader>(queryString, [userId, pollId, commentTitle]);                                     
                resolve(fields);
            } catch (error) { 
                reject(error); 
            }
        })
    }
}

export default Comment;