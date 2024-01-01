import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

const useSyle = makeStyles(() =>
  createStyles({
    boxFile: {
      width: "100px",
      height: "100px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    boxFileBanner: {
      width: "100%",
      height: "300px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    boxItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    input: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100px",
      height: "100px",
      cursor: "pointer",
      opacity: 0,
    },
    inputBanner: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "300px",
      cursor: "pointer",
      opacity: 0,
    },
  })
);

const File = ({ image, type, handleOnchange }) => {
  const classes = useSyle();
  const [fileUrl, setFileUrl] = useState(null);
  const handleFile = (e) => {
    const getfile = e.target.files[0];
    if (getfile) {
      setFileUrl(URL.createObjectURL(getfile));
    } else {
      return;
    }
    handleOnchange(e);
  };
  return type === "banner" ? (
    <Box className={classes.boxFileBanner}>
      {image || fileUrl ? (
        <Box sx={{ width: "100%" }}>
          <img
            src={fileUrl ? fileUrl : image}
            alt="img"
            height={300}
            width={"100%"}
          />
        </Box>
      ) : (
        <Box className={classes.boxItem}>
          <FaCloudUploadAlt style={{ fontSize: "30px" }} />
          <Typography sx={{ fontSize: "14px" }}>Tải ảnh</Typography>
        </Box>
      )}
      <input
        type="file"
        name="banner"
        className={classes.inputBanner}
        onChange={handleFile}
      />
    </Box>
  ) : (
    <Box className={classes.boxFile}>
      {image || fileUrl ? (
        <Box>
          <img
            src={fileUrl ? fileUrl : image}
            alt="img"
            width={100}
            height={100}
          />
        </Box>
      ) : (
        <Box className={classes.boxItem}>
          <FaCloudUploadAlt style={{ fontSize: "30px" }} />
          <Typography sx={{ fontSize: "14px" }}>Tải ảnh</Typography>
        </Box>
      )}
      <input
        type="file"
        name="image"
        className={classes.input}
        onChange={handleFile}
      />
    </Box>
  );
};

export default File;
