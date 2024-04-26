import Comment from "../db/models/comment.js";
import { response } from "../types/response.js";
import { snakeToCamel } from "../utils/index.js";
import { Request, Response } from "express";

export default function comment(req: Request, res: Response): Promise<void> | undefined {
    switch (req.method) {
        case "GET":
            return getComments(req, res); 
        case "POST":
            return insertComment(req, res);    
    }
}

/**
 * GET comments
 * @param req
 * @param res 
 */
async function getComments(req: Request, res: Response) {
    try { 
        const pollIdParam = req.params.pollId;

        // if get all comments 
        const comments = await Comment.getAll(parseInt(pollIdParam));
        const transFormComments = comments.map((comment) => snakeToCamel(comment))
        res.status(200).json(response.onSuccess("Comments found", transFormComments));

    } catch(error: any) {
        res.status(500).json(response.error(error.message));
    }
}

/**
 * INSERT a comment
 * @param req
 * @param res 
 */
async function insertComment(req: Request, res: Response) {
    try {
        const comment = req.body;

        const result = await Comment.insert(comment);
        res.status(200).json(response.onSuccess("Comment inserted", result))

    } catch(error: any) {
        res.status(500).json(response.error(error.message));
    }
}

