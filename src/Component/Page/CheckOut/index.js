import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import CheckOutLeft from "./CheckOutLeft";
import CheckOutRight from "./CheckOutRight";
import { useContext } from "react";
import { ValueContext } from "../../Layout";
import axios from "axios";
import { handleValueCustomer } from "../../../helpek/handleValue";
import {
  createCustomer,
  updateCustomer,
} from "../../../store/saga/watchCustomerSage";
import SnackBar from "../../../helpek/SnackBar";
// import { updateClock } from "../../../store/saga/watchClockSaga";
import request from "../../../req";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import logo from "../../../Image/logo.svg";
import paths from "../../../paths/paths";
import { updateClock } from "../../../store/saga/watchClockSaga";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "40px",
    },
  })
);

const CheckOut = () => {
  const classes = useStyle();
  const {
    productCart,
    setProductCart,
    handleDeleteCart,
    handleIncrease,
    handleReduce,
  } = useContext(ValueContext);

  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const { key } = match.params;
  const search = new URLSearchParams(location.search);
  const responseCode = search.get("vnp_ResponseCode");
  const totalPrice = productCart.reduce(
    (price, item) =>
      price + (item?.price - (item?.price * item?.sell) / 100) * item?.count,
    0
  );
  const initialValue = {
    email: "",
    name: "",
    phone: "",
    address: "",
    province: {},
    district: {},
    ward: {},
    clocks: productCart,
    desc: "",
    totalPrice: totalPrice,
  };
  const [value, setValue] = useState(initialValue);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistrict] = useState({});
  const [wards, setWards] = useState({});
  const [errorValue, setErrorValue] = useState({});
  const [redirectUrl, setRedirectUrl] = useState("");
  const [payOnline, setPayOnline] = useState(false);
  const [customer, setCustomer] = useState(() => {
    const locaStorageCustomer = JSON.parse(localStorage.getItem("customer"));
    if (locaStorageCustomer) {
      return locaStorageCustomer;
    } else {
      return {};
    }
  });
  const [snack, setSnack] = useState({
    open: false,
    error: false,
    message: "",
  });
  useEffect(() => {
    const fetchDataLocationProvinces = async () => {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/p/`
        );

        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchDataLocationProvinces();
  }, []);
  useEffect(() => {
    const fetchDataLocationDistrict = async () => {
      try {
        if (value?.province?.code) {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${value?.province?.code}?depth=2`
          );
          setDistrict(response.data);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchDataLocationDistrict();
  }, [value?.province?.code]);
  useEffect(() => {
    const fetchDataLocationWard = async () => {
      try {
        if (value?.district?.code) {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${value?.district?.code}?depth=2`
          );
          setWards(response.data);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchDataLocationWard();
  }, [value?.district?.code]);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);
  useEffect(() => {
    if (responseCode) {
      if (responseCode === "00") {
        const updateCustomerPay = async () => {
          setProductCart([]);
          await updateCustomer({ ...customer, statusPayment: "Đã thanh toán" });
          setSnack({
            open: true,
            error: false,
            message: "Thanh toán đơn hàng thành công",
          });
          await localStorage.removeItem("customer");
        };
        updateCustomerPay();
      } else {
        localStorage.removeItem("customer");
        setSnack({
          open: true,
          error: true,
          message: "Thanh toán đơn hàng không thành công",
        });
      }
    }
  }, [responseCode, setProductCart, customer]);
  const handleOnblur = () => {
    setErrorValue(handleValueCustomer(value));
  };
  const handleOnchange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleCreateCustomer = async (e) => {
    try {
      e.preventDefault();
      if (
        Object.values(value).every((item) => item !== "") &&
        Object.values(errorValue).every((item) => !item)
      ) {
        const response = await createCustomer({
          ...value,
          province: value.province.name,
          district: value.district.name,
          ward: value.ward.name,
          clocks: value.clocks,
          totalPrice: value.totalPrice,
        });
        if (response.status === 200) {
          productCart?.forEach((clock) => {
            updateClock({
              ...clock,
              quantity:
                clock?.quantity > 0 ? clock?.quantity - clock?.count : 0,
            });
          });
          localStorage.setItem("customer", JSON.stringify(response?.data));
          setSnack({
            open: true,
            error: false,
            message: "Đặt hàng thành công.",
          });
          setPayOnline(true);
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Đặt hàng thất bại.",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        error: true,
        message: "Đặt hàng thất bại.",
      });
    }
  };

  const handlePayment = async () => {
    // Gửi yêu cầu tạo thanh toán đến server Node.js
    try {
      const response = await request.post("vnpay/create_payment_url", {
        orderId: value?._id,
        amount: totalPrice,
        bankCode: "",
      });
      // Lưu trữ URL trả về từ server và redirect người dùng
      setRedirectUrl(response.data);
    } catch (error) {
      console.error("Error creating payment:", error.message);
    }
  };
  switch (key) {
    case "pay":
      return (
        <Box className={classes.wrap} sx={{ justifyContent: "center" }}>
          <Box className={classes.box}>
            <img
              src={logo}
              alt="logo"
              onClick={() => history.push(paths.home)}
              style={{ cursor: "pointer" }}
            />
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#161a21",
              }}
            >
              Thanh toán đơn hàng thành công
            </Typography>
          </Box>
        </Box>
      );
    default:
      return (
        <Box className={classes.wrap}>
          <CheckOutLeft
            provinces={provinces}
            districts={districts}
            wards={wards}
            errorValue={errorValue}
            redirectUrl={redirectUrl}
            payOnline={payOnline}
            handleOnblur={handleOnblur}
            handleOnchange={handleOnchange}
            handleCreateCustomer={handleCreateCustomer}
            handlePayment={handlePayment}
          />
          <CheckOutRight
            productCart={productCart}
            handleDeleteCart={handleDeleteCart}
            handleIncrease={handleIncrease}
            handleReduce={handleReduce}
            totalPrice={totalPrice}
          />
          <SnackBar snack={snack} setSnack={setSnack} />
        </Box>
      );
  }
};

export default CheckOut;
