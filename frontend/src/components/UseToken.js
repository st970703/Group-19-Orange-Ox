import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    if (userToken != null) {
        return userToken;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    // Used to prevent faulty token from being saved
    const hasValue = userToken.hasOwnProperty("message");
    if (!hasValue) {
        sessionStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken.token);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}
