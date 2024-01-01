import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { AiOutlineClose } from "react-icons/ai";
import Buttons from "../helpek/Button";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  BsTruck,
  BsFillPatchMinusFill,
  BsFillPatchPlusFill,
} from "react-icons/bs";
import reqImage from "../req/reqImage";
import { useHistory } from "react-router-dom";
import paths from "../paths/paths";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(120,120,119,0.6)",
      zIndex: 110,
    },
    boxCart: {
      maxWidth: "400px",
      width: "100%",
      height: "100vh",
      backgroundColor: "#fff",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: "14px !important",
      color: "#161a21",
    },
  })
);

const Cart = ({
  openCart,
  setOpenCart,
  productCart,
  totalPrice,
  handleDeleteCart,
  handleIncrease,
  handleReduce,
}) => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <>
      {openCart && (
        <Box className={classes.wrap}>
          <Box className={classes.boxCart}>
            <Box
              className={classes.box}
              sx={{
                backgroundColor: "#161a21",
                height: "80px",
                justifyContent: "space-between",
                padding: "0 30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  textTransform: "uppercase",
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                GIỎ HÀNG CỦA BẠN
              </Typography>
              <AiOutlineClose
                style={{ fontSize: "26px", color: "#fff", cursor: "pointer" }}
                onClick={() => setOpenCart(false)}
              />
            </Box>
            {productCart?.length === 0 && (
              <Box sx={{ height: "90%", padding: "30px 0" }}>
                <Box
                  className={classes.box}
                  sx={{
                    padding: "160px 30px",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    Hiện đang chưa có sản phẩm nào trong giỏ hàng của bạn.
                  </Typography>
                  <Buttons
                    content={"Mua hàng ngay"}
                    onClick={() => {
                      history.push("/");
                      setOpenCart(false);
                    }}
                    endIcon={
                      <HiArrowNarrowRight
                        style={{ marginLeft: "10px", fontSize: "16px" }}
                      />
                    }
                    classes={{
                      backgroundColor: "#161a21",
                      width: "100%",
                      "&:hover": {
                        backgroundColor: "#161a21",
                        opacity: 0.9,
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
            <Box
              className={classes.box}
              sx={{ height: "40px", gap: "10px", backgroundColor: "#ecebea" }}
            >
              <BsTruck style={{ fontSize: "20px" }} />
              <Typography sx={{ textTransform: "uppercase", fontSize: "14px" }}>
                {"MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG >700K"}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "30px 0",
                height: "65%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {productCart?.map((item) => (
                <Box
                  className={classes.box}
                  sx={{ padding: "0 30px", gap: "20px" }}
                  key={item?._id}
                >
                  <Box sx={{ width: "100px", position: "relative" }}>
                    <img
                      src={reqImage(item?.image)}
                      alt="img"
                      style={{ width: "100px" }}
                    />
                    <AiOutlineClose
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        fontSize: "24px",
                        padding: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteCart(item?._id)}
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box
                      className={classes.box}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography
                        className={classes.text}
                        sx={{
                          textTransform: "uppercase",
                        }}
                      >
                        {item?.name}
                      </Typography>
                      <Box>
                        <Typography
                          className={classes.text}
                          sx={{ fontWeight: "700" }}
                        >
                          {(
                            item?.price -
                            (item?.price * item?.sell) / 100
                          )?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                        {item?.sell && (
                          <Typography
                            sx={{
                              fontSize: "12px",
                              opacity: 0.7,
                              textDecoration: "line-through",
                            }}
                          >
                            {item?.price?.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box
                      className={classes.box}
                      sx={{
                        justifyContent: "space-between",
                        paddingTop: "15px",
                      }}
                    >
                      <Typography
                        className={classes.text}
                        sx={{
                          textTransform: "uppercase",
                        }}
                      >
                        {item?.sizeFace}
                      </Typography>
                      <Box
                        className={classes.box}
                        sx={{
                          padding: "5px 5px 5px 10px",
                          gap: "8px",
                          borderLeft: "1px solid #d6d6d4",
                        }}
                      >
                        <BsFillPatchMinusFill
                          style={{ color: "#999", cursor: "pointer" }}
                          onClick={() => handleReduce(item)}
                        />
                        <Typography>Qty:{item?.count}</Typography>
                        <BsFillPatchPlusFill
                          style={{ color: "#999", cursor: "pointer" }}
                          onClick={() => handleIncrease(item)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              className={classes.box}
              sx={{
                padding: "24px 30px 40px",
                width: "100%",
                flexDirection: "column",
                gap: "20px",
                borderTop: "1px solid #d0d1d3",
              }}
            >
              <Box
                className={classes.box}
                sx={{ justifyContent: "space-between", width: "100%" }}
              >
                <Typography>Thành tiền:</Typography>
                <Typography sx={{ fontWeight: "700", color: "#ff5e57" }}>
                  {totalPrice?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Box>
              <Buttons
                content={"Thanh toán ngay"}
                onClick={() => history.push(paths.checkout)}
                classes={{
                  width: "100%",
                  backgroundColor: "#53c66e",
                  "&:hover": {
                    backgroundColor: "#53c66e",
                    opacity: 0.8,
                  },
                }}
                endIcon={
                  <HiArrowNarrowRight
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                    }}
                  />
                }
              />
              <Typography>
                *Ước tính thời gian ship:{" "}
                <b style={{ fontWeight: 400, color: "#53c66e" }}>26/10/2023</b>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
