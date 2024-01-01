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

const AnClock = ({ clock, loading }) => {
  const classes = useStyle();
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxTitle}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          Thông tin chi tiết sản phẩm
        </Typography>
      </Box>
      {loading ? (
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
              src={reqImage(clock?.image)}
              alt="img"
              width={100}
              height={100}
            />
          </Box>

          <Box className={classes.box}>
            <Typography> Tên đồng hồ: {clock?.name}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography> Thương hiệu: {clock?.brand?.name}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Giới tính: {clock?.genres}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Giá: {clock?.price}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Kích thước mặt: {clock?.sizeFace}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Độ dày: {clock?.thickness}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Màu mặt: {clock?.colorFace}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Loại máy: {clock?.genresClock}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Kích cỡ dây: {clock?.sizeWire}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Chống nước: {clock?.Waterproof}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Mặt kính: {clock?.faceGlasses}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Chất liệu dây: {clock?.wireMaterial}</Typography>
          </Box>
          {clock?.sell && (
            <Box className={classes.box}>
              <Typography>Giảm giá: {clock?.sell}</Typography>
            </Box>
          )}
          <Box className={classes.box}>
            <Typography>Số lượng: {clock?.quantity}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Mô tả: {clock?.desc}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnClock;
