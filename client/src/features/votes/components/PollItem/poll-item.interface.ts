import { VoteType } from "../../../../common/types";

export interface PollItemProp { 
    choiceId: number;
    voteCount: number;
    pollName: string;
    pollId: number;
    userId: number;
    handleCastVote: (data: VoteType) => void;
}