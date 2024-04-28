import { UserType } from "../../../common/types";
import { PollType } from "../../../common/types";

export interface PollProp { 
    poll: PollType;
    stickerId?: number;
    clrId?: number;
    active: boolean;
}