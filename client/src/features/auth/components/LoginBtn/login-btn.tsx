import { useEffect } from "react";
import { Button } from "../../../../components/Elements"
import { GITHUB_AUTHORIZE_URL } from "../../../../config";
import { userLogin } from "../../api/loginUser";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { fetchUserData } from "../../api/fetchUserData";
import { Avatar } from "../Avatar";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { extractQuery } from "../../../../utils";
import { insertUser } from "../../api/insertUserToDb";
import { UserType } from "../../../../common/types";
import { AxiosResponse } from "axios";

const loginWithGithub = () => {
  window.location.assign(GITHUB_AUTHORIZE_URL);
}

export const LoginBtn = () => {

  const {value: accessToken, setValue: setAccessToken} = useLocalStorage("access_token", null);
  const {mutate} = userLogin(setAccessToken);
  const {data: userData, refetch} = fetchUserData();
  const {setUser} = useAuthContext();
  const {mutate: userInsertToDb} = insertUser(mutationCallback);

  function mutationCallback(newUser: AxiosResponse) {
    setUser((prevUser: UserType | null) => {

      if (prevUser) { 
        const userId = newUser.data.data.userId;
        
        return {...prevUser, userId}
      }
      return prevUser;
    })
  }
  

  useEffect(() => { 
    const codeParam = extractQuery("code");

    if (codeParam !== null && accessToken === null) { 
        mutate(codeParam)
    } else if (accessToken !== null) {
      refetch();
    }
  }, [])

  useEffect(() => { 
    if (userData) {
      const {avatar_url, login} = userData;

      userInsertToDb({accessToken, 
        userProfile: avatar_url,
        username: login})

      setUser({accessToken, 
               userProfile: avatar_url,
              username: login});
    }
  }, [userData])

  useEffect(() => {
    if (accessToken) {
      refetch(); 
    }
  }, [accessToken]);


  return (
    <>{userData ? 
    <Avatar 
      avatar_url={userData.avatar_url}
      className="w-[50px] h-[50px] rounded-full border-2 border-green-400"/> : 
    <Button 
      onClick={loginWithGithub}
      variant="btn-login-dark"
      icon={true}>
      Login
    </Button>}
    
    </>
  )
}
