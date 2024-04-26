

export type UserModel = {
    userId?: number;
    accessToken: string;
    username: string; 
    [key: number | string]: unknown;
}

export type PollModel = {
    pollId?: number;
    userId: number;
    pollName: string;
    choices: ChoiceModel[];
    createdAt: Date;
    expirationDate: Date;  
    [key: number | string]: unknown;
}

export type CommentModel = {
    commentId?: number;
    userId:number;
    pollId: number;
    commentTitle: string;
    createdAt: Date;
}

export type ChoiceModel = {
    choiceId?: number;
    pollId: number;
    choiceName: string;   
    [key: number | string]: unknown;
}


export type VoteModel = {
    voteId?: number;
    userId: number;
    pollId: number;
    choiceId: number;  
    voteCount: number;
    [key: number | string]: unknown;
}