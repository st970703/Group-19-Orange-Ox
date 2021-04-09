import React from 'react';
import { useParams } from 'react-router';

function Account() {
  const {userId} = useParams();

  return (
    <div>
      <h1>Account</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

export default Account;