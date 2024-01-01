import React from "react";
import { Button } from "@mui/material";

const Buttons = ({ content, classes, startIcon, endIcon, onClick, type }) => {
  return (
    <Button
      variant="outlined"
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick && onClick}
      sx={{
        borderRadius: 0,
        padding: "14px 60px",
        color: "#fff",
        border: "1px solid #fff",
        textTransform: "uppercase",
        fontWeight: "700",
        "&:hover": {
          border: "1px solid #fff",
        },
        ...classes,
      }}
    >
      {content}
    </Button>
  );
};

export default Buttons;
