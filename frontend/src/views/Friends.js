import { Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import PeopleIcon from '@material-ui/icons/People';

function Friends() {
  const { userId } = useParams();
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Friends <PeopleIcon fontSize={'large'} />
      </Typography>
      <Typography variant="body1">
        User ID: {userId}
      </Typography>
    </div>
  );
}

export default Friends;