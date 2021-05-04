import { Typography } from '@material-ui/core';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router';

function Friends() {
  const { user } = useAuth0();
  const {userId} = useParams();
  console.log(user);
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Friends
      </Typography>
      <Typography variant="body1">
        <p>User ID: {userId}</p>
      </Typography>
    </div>
  );
}

export default Friends;