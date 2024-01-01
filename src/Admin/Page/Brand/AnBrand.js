import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import reqImage from "../../../req/reqImage";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      padding: "20px",
    },
    boxTitle: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "25px",
    },
    boxList: {
      padding: "20px",
      border: "1px solid #E8EBED",
      borderRadius: "6px",
    },
    hover: {
      "&:hover": {
        opacity: 0.6,
      },
    },
    box: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "25px",
      gap: "10px",
    },
  })
);

const AnBrand = ({ brand, loadingBrand }) => {
  const classes = useStyle();
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxTitle}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          Thông tin chi tiết thương hiệu
        </Typography>
      </Box>
      {loadingBrand ? (
        <Box className={classes.boxList}>
          <Box className={classes.box}>
            <Skeleton variant="rounded" width={100} height={100} />
          </Box>
          <Box className={classes.box} sx={{ width: "100%" }}>
            <Skeleton variant="rounded" height={300} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="text" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="text" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="text" height={30} />
          </Box>
        </Box>
      ) : (
        <Box className={classes.boxList}>
          <Box className={classes.box}>
            <Typography>Ảnh:</Typography>
            <img
              src={reqImage(brand?.image)}
              alt="img"
              width={100}
              height={100}
            />
          </Box>
          <Box className={classes.box} sx={{ width: "100%" }}>
            <Typography>Ảnh Banner:</Typography>
            <img src={reqImage(brand?.banner)} alt="img" height={300} />
          </Box>
          <Box className={classes.box}>
            <Typography> Tên thương hiệu: {brand?.name}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Giới tính: {brand?.genres}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Mô tả: {brand?.desc}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnBrand;
