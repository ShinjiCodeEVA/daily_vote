import { Response, Request } from "express";
import { response } from "../../types/response.js";
import { AuthEndpoints } from "../../types/enums.js";
import fetch from 'node-fetch';

export function auth(req: Request, res: Response): Promise<void> | undefined {
    const path = req.path.substring(req.path.lastIndexOf('/'));
    
    switch (path) { 
        case AuthEndpoints.GET_ACCESS_TOKEN:
            return getAccessToken(req, res);
        case AuthEndpoints.GET_USER_DATA:
            return getUserData(req, res);
    }
}

/**
 * Generate access token 
 * @param req 
 * @param res 
 */
async function getAccessToken(req: Request, res: Response) { 
    const code = req.query.code;
    const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;

    try { 
        const result = await fetch(`https://github.com/login/oauth/access_token${params}`, {
            method: "POST",
            headers: {"Accept": "application/json"}
        })
        const data = await result.json();
        res.status(200).json(response.onSuccess("Access token generated", data));

    } catch (err: any) {
        res.status(401).json(response.error(err.message));
    }
}

/**
 * Fetches user data 
 * @param req 
 * @param res 
 */
async function getUserData(req: Request, res: Response) { 
    const token = req.get("Authorization");

    try { 
        if (!token) {
            throw new Error("Authorization key is missing");
        }

        const result = await fetch(`https://api.github.com/user`, { 
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        })

        const data = await result.json();
        res.status(200).json(response.onSuccess("Successfully login", data));
        
    } catch (err: any) { 
        res.status(401).json(response.error(err.message));
    }
}

