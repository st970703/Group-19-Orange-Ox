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
  return fetch("http://localhost:3001/api/auth/signin", {
    method: "POST",
    headers: {
      "accepts": "application/json",
      "Content-Type": "application/json",
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
    if (username === "" || password === "") {
      dialogcontexttext = "Please enter a username and/or password!"
      console.log(dialogcontexttext);
    } else {
      const token = await loginUser({
        username,
        password,
      });
      setToken(token);

      handleClose();
      window.location.reload(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let dialogcontexttext = "Please log in to use more features in Virtual Playground";

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
            {dialogcontexttext}
          </DialogContentText>
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
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            required 
            margin="dense"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            color="primary" 
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
