import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@material-ui/core";
import UserInfoTable from '../components/UserInfoTable';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const Profile = () => {
  const { user } = useAuth0();
  const { picture } = user;

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Profile <AccountBoxIcon fontSize={'large'} />
      </Typography>

      <img src={picture}
        alt="No Image Found :("
        style={{ marginBottom: 16 }} />

      <UserInfoTable />
    </>
  );
};

export default Profile;