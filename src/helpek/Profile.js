import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { HiArrowNarrowRight } from "react-icons/hi";
const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      maxWidth: "1240px",
      width: "100%",
      marginTop: "100px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      textAlign: "center",
      padding: "0 40px",
    },
    title: {
      fontSize: "30px",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
  })
);

const Profile = ({ content, content2, children, image, desc, buttonLink }) => {
  const classes = useStyle();
  return (
    <Box className={classes.wrap}>
      <Box
        className={classes.box}
        sx={{ gap: "20px", flexDirection: "column" }}
      >
        {image && <Box>{image}</Box>}
        {content && <Box className={classes.title}>{content}</Box>}
        {content2 && (
          <Box className={classes.title} sx={{ fontSize: "20px" }}>
            {content2}
          </Box>
        )}
        {buttonLink && (
          <Box className={classes.box} sx={{ cursor: "pointer" }}>
            <Typography sx={{ textTransform: "uppercase", fontSize: "14px" }}>
              Xem tất cả
            </Typography>
            <HiArrowNarrowRight style={{ fontSize: "20px" }} />
          </Box>
        )}
        {desc && (
          <Box
            sx={{
              maxWidth: "700px",
              letterSpacing: ".02rem",
              lineHeight: "24px",
              fontSize: "14px",
              color: "rgba(22,26,33,.6)",
            }}
          >
            {desc}
          </Box>
        )}
      </Box>
      <Box className={classes.box} sx={{ gap: "60px 24px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Profile;
