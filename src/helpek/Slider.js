import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Button from "./Button";
import reqImage from "../req/reqImage";
const useStyle = makeStyles(() =>
  createStyles({
    boxImage: {
      position: "relative",
      width: "100%",
    },
    boxTitle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      maxWidth: "1240px",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      textAlign: "center",
    },
    text: {
      textTransform: "uppercase",
      fontWeight: "700 !important",
      color: "#ffff",
    },
  })
);

const Slider = ({ banners }) => {
  const classes = useStyle();
  return (
    <>
      {banners?.map((item) => (
        <Box className={classes.boxImage} key={item?._id}>
          <Box className={classes.boxImage}>
            <img
              src={reqImage(item?.image)}
              alt="sliderHome"
              style={{ height: "600px", width: "100%" }}
            />
          </Box>
          <Box className={classes.boxTitle}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Box>
                <Typography className={classes.text} sx={{ fontSize: "20px" }}>
                  {item?.preTitle}
                </Typography>
                <Typography
                  className={classes.text}
                  sx={{ fontSize: "46px", lineHeight: "56px" }}
                >
                  {item?.title}
                </Typography>
                <Typography
                  className={classes.text}
                  sx={{
                    fontSize: "16px",
                    textTransform: "none !important",
                    fontWeight: "400 !important",
                  }}
                >
                  {item?.desc}
                </Typography>
              </Box>
              <Box>
                <Button content={"Shop now"} />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Slider;
