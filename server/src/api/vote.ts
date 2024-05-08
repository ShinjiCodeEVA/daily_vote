import { Response, Request } from "express";
import { response } from "../types/response.js";
import Vote from "../db/models/vote.js";
import { snakeToCamel } from "../utils/index.js";

export default function vote(req: Request, res: Response): Promise<void> | undefined {
    switch (req.method) {
        case "GET":
            return getVotes(req, res); 
        case "POST":
            return insertVote(req, res);    
    }
}

/**
 * GET vote
 * GET votes
 * @param req 
 * @param res 
 */
async function getVotes(req: Request, res: Response) {
    try { 
        const voteIdParam = req.params.voteId;

        // if get vote by id
        const vote = await Vote.findOne(parseInt(voteIdParam));
        res.status(200).json(response.onSuccess("Vote found", snakeToCamel(vote[0])));

    } catch(error: any) {
        res.status(500).json(response.error(error.message));
    }
}

/**
 * INSERT a vote
 * @param req
 * @param res 
 */
async function insertVote(req: Request, res: Response) {
    try {
        const vote = req.body;

        const result = await Vote.insert(vote);
        res.status(200).json(response.onSuccess("Vote inserted", result))

    } catch(error: any) {
        res.status(500).json(response.error(error.message));
    }
}