

export type UserModel = {
    userId?: number;
    accessToken: string;
    username: string; 
}

export type PollModel = {
    pollId?: number;
    userId: number;
    pollName: string;
    choices: ChoiceModel[];
    createdAt: Date;
    expirationDate: Date;  
}

// export type CommentModel = {
//     commentId?: number;
//     userId?:number;
//     pollId: 
// }

export type ChoiceModel = {
    choiceId?: number;
    pollId: number;
    choiceName: string;   
}