import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import Buttons from "./Button";
import "../App.css";
import reqImage from "../req/reqImage";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "270px",
      height: "410px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px",
      "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 40px",
        transform: "translate(0,-2px)",
        cursor: "pointer",
      },
      zIndex: 0,
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      cursor: "pointer",
    },
    boxButton: {
      position: "absolute",
      width: "100%",
      top: "50%",
    },
    boxText: {
      position: "absolute",
      bottom: 0,
      display: "flex",
      flexDirection: "column",
    },
    boxPrice: {
      display: "flex",
      gap: "10px",
      padding: "12px 0",
    },
    boxSell: {
      backgroundColor: "#ff5e57",
      color: "#fff",
      padding: "8px",
      width: "42px",
      height: "30px",
      borderRadius: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "700",
      position: "absolute",
      top: 16,
      left: 16,
    },
  })
);

const Card = ({ clock, handleAddProductCart }) => {
  const classes = useStyle();
  const history = useHistory();
  const priceSell = clock?.price - (clock?.price * clock?.sell) / 100;

  return (
    <Box className={`${classes.wrap} wrapCard`}>
      <Box
        className={classes.box}
        onClick={() =>
          history.push(`/clock/${clock?.brand?.name}/${clock?._id}`)
        }
      >
        <Box className={classes.image}>
          {clock?.sell && <Box className={classes.boxSell}>{clock?.sell}%</Box>}
          <img
            src={reqImage(clock?.image)}
            alt="product"
            width={270}
            height={270}
          />
        </Box>
        <Box className={classes.boxText}>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.6)",
                cursor: "default",
              }}
            >
              {clock?.brand?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.6)",
                marginTop: "10px",
                cursor: "default",
              }}
            >
              {clock?.name}
            </Typography>
          </Box>
          <Box className={classes.boxPrice}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#161a21",
                fontWeight: "700",
                cursor: "default",
              }}
            >
              {priceSell?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            {clock?.sell && (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#a8a8a9",
                  fontWeight: "500",
                  textDecoration: "line-through",
                  cursor: "default",
                }}
              >
                {clock?.price?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box className={`${classes.boxButton} boxButtonCard`}>
        <Buttons
          content={"Thêm vào giỏ hàng"}
          onClick={() => handleAddProductCart(clock)}
          classes={{
            color: "#161a21",
            width: "100%",
            fontSize: "14px",
            backgroundColor: "#ecebea",
            "&:hover": {
              backgroundColor: "#161a21",
              color: "#fff",
              border: "1px solid #fff",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Card;
