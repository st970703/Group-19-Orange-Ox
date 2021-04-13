import {NavLink} from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
    <NavLink
      to="/profile"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Profile
    </NavLink>
    <NavLink
      to="/canvas"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Canvas
    </NavLink>
    <NavLink
      to="/friends"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Friends
    </NavLink>
  </div>
);

export default MainNav;
