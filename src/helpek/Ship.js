import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { DataShip } from "../mockData";
const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      height: "60px",
      backgroundColor: "#ecebea",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
  })
);

const Ship = () => {
  const classes = useStyle();

  return (
    <Box className={classes.wrap}>
      {DataShip.map((item) => (
        <Box className={classes.box} key={item?.id}>
          <Box>{item?.icon}</Box>
          <Typography sx={{ fontSize: "14px" }}>{item?.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Ship;
