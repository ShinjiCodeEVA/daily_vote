import { AuthContextType, AuthContextProviderProp } from ".";
import { createContext, useState } from "react";
import { UserType } from "../../common/types";


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: AuthContextProviderProp) => { 

    const [user, setUser] = useState<UserType | null>(null); 

    return <AuthContext.Provider value={{user, setUser}}> 
                {children} 
           </AuthContext.Provider> 
}