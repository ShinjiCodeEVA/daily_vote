import { Response, Request } from "express";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";

export type AppRoute = {
    path: string,
    methods: HttpMethod[],
    handler: (req: Request, res: Response) => void;
}