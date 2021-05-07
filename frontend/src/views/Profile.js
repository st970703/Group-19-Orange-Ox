import React from "react";
import { Typography } from "@material-ui/core";
import UserInfoTable from "../components/UserInfoTable";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const Profile = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Profile <AccountBoxIcon fontSize={"large"} />
      </Typography>

      <UserInfoTable />
    </>
  );
};

export default Profile;
