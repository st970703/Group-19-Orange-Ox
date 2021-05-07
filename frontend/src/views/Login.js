import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

async function loginUser(credentials) {
  return fetch("http://localhost:3001/api/auth/signin", {
    method: "POST",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function createUser(credentials) {
  return fetch("http://localhost:3001/api/auth/signup", {
    method: "POST",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      dialogcontexttext = "Please enter a username and/or password!";
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

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" || password !== "") {
      await createUser({
        username,
        password,
      });

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dialogcontexttext =
    "Please log in to use more features in Virtual Playground";

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
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Log In" {...a11yProps(0)} />
          <Tab label="Create User" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogcontexttext}</DialogContentText>
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
            <Button onClick={handleLoginSubmit} color="primary">
              Log In
            </Button>
          </DialogActions>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DialogTitle id="form-dialog-title">Create User</DialogTitle>
          <DialogContent>
            <DialogContentText>Create an account to use all the features of Virtual Playground</DialogContentText>
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
              type="text"
              autoComplete="current-password"
              color="primary"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateSubmit} color="primary">
              Create User
            </Button>
          </DialogActions>
        </TabPanel>
      </Dialog>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
