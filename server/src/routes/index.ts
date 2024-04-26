import user from "../api/user.js";
import poll from "../api/poll.js";
import { AppRoute } from "../types/index.js";

export const routes: AppRoute[] = [
    {path: '/user', methods: ["GET", "POST"], handler: user},
    {path: '/user/:userId', methods: ["GET"], handler: user},

    {path: '/poll', methods: ["GET", "POST"], handler: poll},
    {path: '/poll/:pollId', methods: ["GET"], handler: poll},
]