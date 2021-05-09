import { Typography } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import useToken from "./UseToken";

// A route where a user must be signed in, in order to access it
const ProtectedRoute = ({ component: Component, ...args }) => {
  const { token } = useToken();

  // Check if the token exists and if not the user has needs to sign in
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
  } else return ( // if the token exists render this component
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
