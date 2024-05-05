
export type UserType = {
    userId?: number;
    accessToken: string;
    username: string; 
    userProfile: string;
    [key: number | string]: unknown;
}

export type PollType = {
    pollId?: number;
    user?: UserType;
    pollName: string;
    description: string;
    choices: ChoiceType[];
    createdAt?: Date | string;
    expirationDate?: Date | string;  
    [key: number | string]: unknown;
}


export type ChoiceType = {
    choiceId?: number;
    pollId?: number;
    choiceName: string;   
    voteCount?: number;
    [key: number | string]: unknown;
}

export type VoteType = {
    userId: number;
    pollId: number;
    choiceId: number;
}
