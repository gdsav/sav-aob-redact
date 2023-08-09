import { useState } from "react";
import { ISaviyntToken } from "../types/ISaviyntToken";

export default function useToken() {
    
  const getToken = (): ISaviyntToken | undefined => {
    const data = sessionStorage.getItem("token");
    if (data) {
      const userToken: ISaviyntToken = JSON.parse(data);
      return userToken;
    }
    return undefined;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken : ISaviyntToken | undefined) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
  
}
