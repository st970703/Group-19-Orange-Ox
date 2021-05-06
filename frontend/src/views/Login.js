import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

async function loginUser(credentials) {
  return fetch("http://localhost:3001/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="login">
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Log In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please log in to use more features in Virtual Playground
          </DialogContentText>
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            fullWidth
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
