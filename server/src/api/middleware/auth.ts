import { Response, Request } from "express";
import { response } from "../../types/response.js";
import { AuthEndpoints } from "../../types/enums.js";
import fetch from 'node-fetch';

export async function auth(req: Request, res: Response): Promise<void> {
    const path = req.path.substring(req.path.lastIndexOf('/'));
  
    switch (path) {
      case AuthEndpoints.GET_ACCESS_TOKEN:
        await getAccessToken(req, res);
        break;
      case AuthEndpoints.GET_USER_DATA:
        await getUserData(req, res);
        break;
    }
}

/**
 * Generate access token 
 * @param req 
 * @param res 
 */
async function getAccessToken(req: Request, res: Response) {
    const code = req.query.code?.toString();
  
    if (!code) {
      return res.status(400).json({ message: 'Missing code parameter' });
    }
  
    const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;
  
    try {
      const result = await fetch(`${AuthEndpoints.GITHUB_ACCESS_TOKEN_URL}${params}`, {
        method: "POST",
        headers: { "Accept": "application/json" },
      });
  
      if (!result.ok) {
        res.status(500).json({ message: 'Failed to generate access token' })
      }
      
      const data = await result.json();
      res.status(200).json({ message: "Access token generated", data });
    } catch (err) {
      console.error(err); 
      res.status(500).json({ message: 'Failed to generate access token' }); 
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

        const result = await fetch(`${AuthEndpoints.GITHUB_USER_DATA_URL}`, { 
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await result.json();
        res.status(200).json(response.onSuccess("Successfully login", data));
        
    } catch (err: any) { 
        res.status(401).json(response.error(err.message));
    }
}

