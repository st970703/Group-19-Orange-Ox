import { Typography } from "@material-ui/core";
import React from "react";
import PeopleIcon from "@material-ui/icons/People";

// Component for finding and adding friends for the user -> For a future sprint
export default function Friends() {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Friends <PeopleIcon fontSize={"large"} />
      </Typography>
      <Typography variant="body1" gutterBottom>
        Coming soon in a future update!
      </Typography>
    </div>
  );
}
