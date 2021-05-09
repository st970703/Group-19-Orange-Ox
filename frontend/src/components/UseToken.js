import { useState } from "react";

// used to allow methods access to the token
export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    if (userToken != null) {
        return userToken;
    }
  };

  // keeps track of the state of the token
  const [token, setToken] = useState(getToken());

  // function used to save the token in session storage
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
