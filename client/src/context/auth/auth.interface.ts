import { UserType } from "../../common/types";

export type AuthContextType = {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>> 
}

export interface AuthContextProviderProp {
    children: React.ReactNode;
} 