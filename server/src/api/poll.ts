import { Response, Request } from "express";
import { response } from "../types/response.js";
import Poll from "../db/models/poll.js";
import { snakeToCamel } from "../utils/index.js";

export default function poll(req: Request, res: Response): Promise<void> | undefined {
    switch (req.method) {
        case "GET":
            return getPolls(req, res); 
        case "POST":
            return insertPoll(req, res);    
    }
}

/**
 * GET poll
 * GET polls
 * @param req
 * @param res 
 */
async function getPolls(req: Request, res: Response) {
    try { 
        const pollIdParam = req.params.pollId;

        // if get poll by id
        if (pollIdParam) { 
           const poll = await Poll.findOne(parseInt(pollIdParam));
           res.status(200).json(response.onSuccess("Poll found", snakeToCamel(poll[0])));
           return;
        }

        // if get all polls 
        const polls = await Poll.getAll();
        const transFormPoll = polls.map((poll) => snakeToCamel(poll))
        res.status(200).json(response.onSuccess("Polls found", transFormPoll));

    } catch(error: any) {
        res.status(500).json(response.error(error.message));
    }
}

/**
 * INSERT a poll
 * @param req
 * @param res 
 */
async function insertPoll(req: Request, res: Response) {
    try {
        const poll = req.body;

        const result = await Poll.insert(poll);
        res.status(200).json(response.onSuccess("Poll inserted", result))

    } catch(error) {
        res.status(500).json(response.error("Failed to insert poll"));
    }
}