import React from "react";
import Login from "../views/Login";
import LogoutButton from "../components/LogoutButton";
import useToken from "./UseToken";

const AuthenticationButton = () => {
  const { token, setToken } = useToken();

  return !token ? <Login setToken={setToken} /> : <LogoutButton setToken={null}/>;
};

export default AuthenticationButton;