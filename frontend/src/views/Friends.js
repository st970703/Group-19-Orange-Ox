import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from "@material-ui/icons/People";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'
import useToken from "../components/UseToken";

async function searchUser(token, credentials) {
  return fetch("http://localhost:3001/api/user/profile", {
    method: "GET",
    headers: {
      "x-access-token": token,
      accepts: "application/json",
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export default function Friends() {
  const { token } = useToken();
  const [username, setUsername] = useState();

  let friends = [];

  const displayFriends = async (e) => {
    const response = await searchUser(token.accessToken, {
      username,
    })
    console.log(response);
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Friends <PeopleIcon fontSize={"large"} />
      </Typography>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Typography variant="h6" gutterBottom>Search By Username: </Typography>
        </Grid>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="Username" onChange={(e) => setUsername(e.target.value)}/>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={displayFriends}>Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
}
