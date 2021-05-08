import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useToken from "./UseToken";

async function updateUser(token, credentials) {
  return fetch("http://localhost:3001/api/user/update", {
    method: "POST",
    headers: {
      "x-access-token": token,
      accepts: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

async function deleteUser(token, credentials) {
  return fetch("http://localhost:3001/api/user/delete", {
    method: "DELETE",
    headers: {
      "x-access-token": token,
      accepts: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function UserInfoTable() {
  const { token, setToken } = useToken();
  const [username, setUserName] = useState();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [text, setText] = useState("Please enter your new username");

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" || username === undefined) {
      let id = token.id;
      let accessToken = token.accessToken;

      const response = await updateUser(accessToken, {
        id,
        username,
      });

      if (response.status === 200) {
        setToken({
          id,
          username,
          accessToken,
        });

        handleUpdateClose();
        window.location.reload(false);
      } else {
        setText("Error updating username! Username may already be in use.");
      }
    }
  };

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleDeleteSubmit = async () => {
    let tokenId = token.id;

    await deleteUser(token.accessToken, {
      tokenId,
      username,
    });

    sessionStorage.clear();
    handleDeleteClose();

    window.location.reload(false);
  };

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateClickOpen}
          >
            Change Username
          </Button>
          <Dialog
            open={updateOpen}
            onClose={handleUpdateClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Update Username</DialogTitle>
            <DialogContent>
              <DialogContentText>{text}</DialogContentText>
              <TextField
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
                required
                margin="dense"
                id="username"
                label="Username"
                variant="outlined"
                type="text"
                color="primary"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdateClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdateSubmit} color="primary">
                Update Username
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteClickOpen}
          >
            Delete My Account
          </Button>
          <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Deleting Your Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                WARNING: There is no coming back once you delete your account, are
                you sure you want to do this?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteSubmit} color="error">
                DELETE MY ACCOUNT
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(UserInfoTable);
