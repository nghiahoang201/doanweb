import React from "react";
import { Box, Skeleton } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import InfoImageClock from "./InfoImageClock";
import InfoDescClock from "./InfoDescClock";
import Ship from "../../../helpek/Ship";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
    },
  })
);
const InfomationClock = ({
  clock,
  loading,
  keyBrand,
  handleAddProductCart,
}) => {
  const classes = useStyle();
  return (
    <Box className={classes.wrap}>
      {loading ? (
        <Skeleton variant="rounded" width={"100%"} height={"650px"} />
      ) : (
        <InfoImageClock
          clock={clock}
          keyBrand={keyBrand}
          handleAddProductCart={handleAddProductCart}
        />
      )}

      <Ship />
      <InfoDescClock clock={clock} />
    </Box>
  );
};

export default InfomationClock;
