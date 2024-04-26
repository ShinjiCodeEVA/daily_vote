import { Response, Request } from "express";
import { response } from "../types/response.js";
import User from "../db/models/user.js";


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
            res.status(200).json(response.onSuccess("User found", [user]));
            return;
        }

        // if get all users 
        const users = await User.getAll();
        res.status(200).json(response.onSuccess("Users found", users));

    } catch(error) {
        res.status(500).json(response.error("Failed to fetch user/s"));
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

    } catch(error) {
        res.status(500).json(response.error("Failed to insert user"));
    }
}