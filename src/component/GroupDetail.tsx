import { Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const GroupDetail = () => {
  const location = useLocation();
  const { group } = location.state;
  const [open, setOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(group.groupId)
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="container">
      <div className="alert alert-primary" role="alert">
        {group.groupId}
      </div>
      <button className="button" onClick={copyToClipboard}>
        copy
      </button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success">Text copied to clipboard!</Alert>
      </Snackbar>
      ;
    </div>
  );
};

export default GroupDetail;
