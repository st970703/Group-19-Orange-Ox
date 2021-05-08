import { Typography } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import Login from "../views/Login";
import useToken from "./UseToken";

const ProtectedRoute = ({ component: Component, ...args }) => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <Typography variant="h3" gutterBottom>
          You must be logged in to access this feature!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please sign in using the button above.
        </Typography>
      </>
    );
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
