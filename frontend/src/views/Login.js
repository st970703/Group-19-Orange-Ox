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
import Divider from "@material-ui/core/Divider";

// function to call fetch request to check if the login is valid
async function checkloginUser(credentials) {
  return fetch("http://localhost:3001/api/auth/signin", {
    method: "POST",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

// function to call fetch request to login in the user
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

// function to call fetch request to create a user
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

// function to contain information about the panel
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
      {value === index && <>{children}</>}
    </div>
  );
}

// function to send props through to tab component
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [dialogText, setText] = useState();

  // used to handle a login request
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (
      username === "" ||
      username === undefined ||
      password === "" ||
      password === undefined
    ) {
      setText("Please enter a username and/or password!");
    } else {
      const response = await checkloginUser({
        username,
        password,
      });

      // if the response status is not valid, update the dialog
      if (response.status === 404 || response.status === 401) {
        setText("Login Failed! Please enter a valid username and/or password!");
      } else if (response.status === 200) {
        // if response is valid, log the user in and set the jwt token
        const token = await loginUser({
          username,
          password,
        });
        setToken(token);

        handleClose();
        window.location.reload(false);
      } else {
        setText("An error occured during the login process");
      }
    }
  };

  // used to handle creating an account
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    // if the username is not entered or defined, update the dialog text
    if (
      username === "" ||
      username === undefined ||
      password === "" ||
      password === undefined ||
      confirmPassword === "" ||
      confirmPassword === undefined
    ) {
      setText("Please enter a username and/or password!");
    } else if (password !== confirmPassword) {
      setText("Password & Confirmation Password do not match! Please try again.")
    } else {
      const response = await createUser({
        username,
        password,
      });

      // if error is 400, the username already exists within the system
      if (response.status === 400) {
        setText(
          "This username has already been taken! Please enter another one."
        );
      } else if (response.status === 200) {
        // if response is 200 they are a valid user and can be logged in
        const token = await loginUser({
          username,
          password,
        });
        setToken(token);

        handleClose();
        window.location.reload(false);
      } else {
        setText(response.message);
      }
    }
  };

  // used to handle open event for dialog
  const handleClickOpen = () => {
    setText("Please login to use Virtual Playground"); // should be login by default so we render the login text
    setOpen(true);
  };

  // used to handle close event for dialog
  const handleClose = () => {
    setOpen(false);
  };

  // used to handle changing between tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // used to handle click events for login tab
  const onLoginTabClicked = () => {
    setText("Please login to use Virtual Playground");
  };

  // used to handle click events for create user tab
  const onCreateUserTabClicked = () => {
    setText("Create an account in order to use Virtual Playground");
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
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Log In" {...a11yProps(0)} onClick={onLoginTabClicked} />
          <Tab
            label="Create User"
            {...a11yProps(1)}
            onClick={onCreateUserTabClicked}
          />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogText}</DialogContentText>
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
            <DialogContentText>{dialogText}</DialogContentText>
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
            <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
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
