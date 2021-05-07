import React from "react";
import Button from "@material-ui/core/Button";

export default function LogoutButton() {
  const onClick = () => {
    sessionStorage.clear();
    window.location.reload(false);
  };

  return (
    <div className="logout">
      <Button variant="contained" color="secondary" onClick={onClick}>
        Log Out
      </Button>
    </div>
  );
}
