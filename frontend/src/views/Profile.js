import React from "react";
import { useParams } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@material-ui/core";
import {getUser} from '../hooks/userHooks';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  const {userData} = getUser(email);
  console.log(userData);
  const { userId } = useParams();

  return (
    <div>        
      <div>
        <Typography variant="h3" gutterBottom>
          Profile
        </Typography>
        <div>
          <img
            src={picture}
            alt="No Image Found :("
          />
        </div>
        <div>
          <Typography variant="body1">
            Name: {name}
          </Typography>
          <Typography variant="body1">
            Email: {email}
          </Typography>
        </div>
        <div>
            <Typography variant="body1">
              User ID: {userId}
            </Typography>
        </div>
      </div>
      <div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;