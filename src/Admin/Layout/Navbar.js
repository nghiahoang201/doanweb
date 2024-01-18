import React, { useEffect } from "react";
import { Badge, Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import {
  FaHome,
  FaBuffer,
  FaSlidersH,
  FaPalette,
  FaWarehouse,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../store/action/customerAction";
import { getBrandReq } from "../../store/action/brandAction";
import { getClockReq } from "../../store/action/clockAction";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      backgroundColor: "#161a21",
      padding: "20px",
      position: "relative",
      top: 0,
      left: 0,
      bottom: 0,
    },
    flex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      gap: "14px",
      cursor: "pointer",
      padding: "6px 0",
      "&:hover": {
        opacity: 0.9,
      },
    },
  })
);
const Navbar = () => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.watchCustomerReducer);
  const textCss = { fontWeight: 700, color: "#fff" };
  const iconCss = { color: "#fff", fontSize: "24px" };
  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);
  return (
    <Box
      className={classes.wrap}
      sx={{
        minWidth: "300px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Bảng điều khiển
        </Typography>
      </Box>
      <Box
        className={classes.flex}
        sx={{
          flexDirection: "column",
          marginTop: "40px",
          gap: "30px",
          alignItems: "start",
          width: "100%",
        }}
      >
        <Box className={classes.box} onClick={() => history.push("/admin")}>
          <FaHome
            style={{
              ...iconCss,
            }}
          />
          <Typography
            sx={{
              ...textCss,
            }}
          >
            Trang chủ
          </Typography>
        </Box>
        <Box
          className={classes.box}
          onClick={() => {
            history.push("/admin/brand/home");
            dispatch(getBrandReq());
          }}
        >
          <FaPalette
            style={{
              ...iconCss,
            }}
          />
          <Typography
            sx={{
              ...textCss,
            }}
          >
            Thương hiệu
          </Typography>
        </Box>
        <Box
          className={classes.box}
          onClick={() => {
            history.push("/admin/clock/home");
            dispatch(getClockReq());
          }}
        >
          <FaBuffer
            style={{
              ...iconCss,
            }}
          />
          <Typography
            sx={{
              ...textCss,
            }}
          >
            Sản phẩm
          </Typography>
        </Box>
        <Box
          className={classes.box}
          onClick={() => history.push("/admin/banner/home")}
        >
          <FaSlidersH
            style={{
              ...iconCss,
            }}
          />
          <Typography
            sx={{
              ...textCss,
            }}
          >
            Banner
          </Typography>
        </Box>
        <Box className={classes.box}>
          <FaWarehouse
            style={{
              ...iconCss,
            }}
          />
          <Typography
            sx={{
              ...textCss,
            }}
            onClick={() => history.push("/admin/order/home")}
          >
            Đơn đặt hàng
          </Typography>
          <Badge
            badgeContent={
              customers.filter((item) => item?.orderConfirmation === false)
                ?.length
            }
            color="secondary"
          ></Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
