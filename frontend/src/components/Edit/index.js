import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import Input from "../Input";

export default function Edit({ action }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = (value) => {
    action(value);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ display: "flex" }}>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Input label="New value" text="Save" action={handleSave} />
      </Popover>
    </div>
  );
}
