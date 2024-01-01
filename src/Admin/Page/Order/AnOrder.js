import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { DMY_HMS, formatTimeIso } from "../../../helpek/formatTime";

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

const AnOrder = ({ customer, loadingCustomer }) => {
  const classes = useStyle();
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxTitle}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          Thông tin chi tiết đơn hàng
        </Typography>
      </Box>
      {loadingCustomer ? (
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
            <Typography> Email: {customer?.email}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography> Tên khách hàng: {customer?.name}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography> Số điện thoại: {customer?.phone}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography> Đơn hàng:</Typography>
            {customer?.clocks?.map((item, index) => (
              <Box className={classes.box} key={index}>
                <Typography>Tên sản phẩm: {item?._id?.name}</Typography>
                <Typography>Số lượng: {item?.count}</Typography>
              </Box>
            ))}
          </Box>
          <Box className={classes.box}>
            <Typography>Địa chỉ: {customer?.address}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Thành phố: {customer?.province}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Quận, huyện: {customer?.district}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>Phường: {customer?.ward}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>
              Hóa đơn:{" "}
              {customer?.totalPrice?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>
              Trạng thái thanh toán: {customer?.statusPayment}
            </Typography>
          </Box>
          <Box className={classes.box}>
            <Typography>
              Thời gian đặt hàng: {formatTimeIso(customer?.createdAt, DMY_HMS)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnOrder;
