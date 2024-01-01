import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import reqImage from "../req/reqImage";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles(() =>
  createStyles({
    box: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
    },
  })
);
const Menu = ({ brand }) => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <Box
      className={classes.box}
      sx={{
        width: "100px",
        flexDirection: "column",
        gap: "14px",
        cursor: "pointer",
        "&:hover": {
          transform: "translate(0,-2px)",
        },
      }}
      onClick={() => history.push(`/clock/${brand?.name}`)}
    >
      <img
        src={reqImage(brand?.image)}
        alt="img"
        width={100}
        height={100}
        style={{
          borderRadius: "100%",
          backgroundColor: "#ecebea",
        }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          color: "rgba(0,0,0,0.6)",
          textTransform: "uppercase",
        }}
      >
        {brand?.name}
      </Typography>
    </Box>
  );
};

export default Menu;
