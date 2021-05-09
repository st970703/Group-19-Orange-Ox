import React from "react";
import Login from "../views/Login";
import LogoutButton from "../components/LogoutButton";
import useToken from "./UseToken";

// used to see whether the log in or log out components need to be called
const AuthenticationButton = () => {
  const { token, setToken } = useToken();

  return !token ? <Login setToken={setToken} /> : <LogoutButton setToken={null}/>;
};

export default AuthenticationButton;