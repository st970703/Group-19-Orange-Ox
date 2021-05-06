import React, { useState } from "react";
import Login from "../views/Login";

const AuthenticationButton = () => {
  const [token, setToken] = useState();

  return <Login setToken={setToken} />;
};

export default AuthenticationButton;