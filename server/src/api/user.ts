import { Response, Request } from "express";
import { response } from "../types/response.js";
import User from "../db/models/user.js";
import { snakeToCamel } from "../utils/index.js";


export default function user(req: Request, res: Response): Promise<void> | undefined {
    switch (req.method) {
        case "GET":
            return getUsers(req, res); 
        case "POST":
            return insertUser(req, res);    
    }
}

/**
 * GET user
 * GET users
 * @param req
 * @param res 
 */
async function getUsers(req: Request, res: Response) {
    try { 
        const userIdParam = req.params.userId;

        // if get user by id
        if (userIdParam) { 
            const user = await User.findOne(parseInt(userIdParam));
            res.status(200).json(response.onSuccess("User found", snakeToCamel(user[0])));
            return;
        }

        // if get all users 
        const users = await User.getAll();
        const transFormUser = users.map((user) => snakeToCamel(user))
        res.status(200).json(response.onSuccess("Users found", transFormUser));

    } catch(error:any) {
        res.status(500).json(response.error(error.message));
    }
}

/**
 * INSERT a user
 * @param req
 * @param res 
 */
async function insertUser(req: Request, res: Response) {
    try {
        const user = req.body;

        const result = await User.insert(user);
        res.status(200).json(response.onSuccess("Student inserted", [result]))

    } catch(error: any) {
        res.status(500).json(response.error(error.message));
    }
}