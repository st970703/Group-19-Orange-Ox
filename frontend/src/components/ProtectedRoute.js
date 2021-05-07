import React from "react";
import { Route } from "react-router-dom";
import Login from "../views/Login";
import useToken from "./UseToken";

const ProtectedRoute = ({ component: Component, ...args }) => {
  const { token, setToken } = useToken();

  console.log(token);
  if (!token) {
    return <Login setToken={setToken} />;
  } else return (
    <Route 
      render={
        (props) => {
          return <Component />
        }
      } 
      {...args}
    />
  );
};

export default ProtectedRoute;
