import { CreatePollPage } from "../pages/CreatePoll"
import { VotePage } from "../pages/Vote"

export const protectedRoutes = [
    {path: '/create', element: <CreatePollPage/>},
    {path: '/vote/:voteId', element: <VotePage/>}
]