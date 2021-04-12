import React from 'react';
import { useParams } from 'react-router';

function Friends() {
  const {userId} = useParams();
  return (
    <div>
      <h1>Friends</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

export default Friends;