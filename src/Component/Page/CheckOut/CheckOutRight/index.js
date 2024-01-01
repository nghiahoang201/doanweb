import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import reqImage from "../../../../req/reqImage";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      padding: "70px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      gap: "50px",
      width: "50%",
      height: "100vh",
      background: "linear-gradient(90deg,#f1f0ee,#f1f0ee 74%,#f8f7f4)",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      width: "100%",
    },
    boxchildren: {
      width: "100%",
      padding: "28px 0",
      borderBottom: "1px solid #d6d6d4",
    },
    textOpacity: {
      opacity: 0.7,
    },
  })
);

const CheckOutRight = ({
  productCart,
  handleDeleteCart,
  handleIncrease,
  handleReduce,
  totalPrice,
}) => {
  const classes = useStyle();
  const [updateProduct, setUpdateProduct] = useState(false);
  return (
    <Box className={classes.wrap}>
      <Box sx={{ maxWidth: "500px", width: "100%", marginLeft: "60px" }}>
        <Box
          className={classes.box}
          sx={{
            justifyContent: "space-between",
            width: "100%",
            padding: "15px 0 28px",
            borderBottom: "1px solid #d6d6d4",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#161a21",
            }}
          >
            Đơn hàng
          </Typography>
          <Typography
            sx={{
              opacity: 0.6,
              textDecoration: "underline",
              fontStyle: "italic",
              cursor: "pointer",
            }}
            onClick={() => setUpdateProduct(!updateProduct)}
          >
            Sửa
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "10px 0 35px",
            width: "100%",
            borderBottom: "1px solid #d6d6d4",
            maxHeight: "340px",
            overflowY: "auto",
          }}
        >
          {productCart?.map((item) => (
            <Box
              className={classes.box}
              sx={{
                paddingTop: "32px",
                paddingRight: "20px",
                justifyContent: "space-between",
                width: "100%",
              }}
              key={item?._id}
            >
              <Box className={classes.box}>
                {updateProduct && (
                  <AiOutlineClose
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteCart(item?._id)}
                  />
                )}
                <img
                  src={reqImage(item?.image)}
                  alt="clock"
                  width={64}
                  height={64}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginLeft: "20px",
                  }}
                >
                  <Typography sx={{ textTransform: "uppercase", opacity: 0.8 }}>
                    {item?.name}
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      opacity: 0.8,
                      fontSize: "14px",
                    }}
                  >
                    {item?.sizeFace}
                  </Typography>
                  <Box
                    className={classes.box}
                    sx={{
                      gap: "10px",
                      justifyContent: updateProduct ? "" : "start",
                    }}
                  >
                    {updateProduct && (
                      <BsFillPatchMinusFill
                        style={{ color: "#999", cursor: "pointer" }}
                        onClick={() => handleReduce(item)}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ opacity: updateProduct ? 1 : 0.4 }}>
                        Qty:
                      </span>{" "}
                      {item?.count}
                    </Typography>

                    {updateProduct && (
                      <BsFillPatchPlusFill
                        style={{ color: "#999", cursor: "pointer" }}
                        onClick={() => handleIncrease(item)}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography>
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
                      fontSize: "14px",
                      textDecoration: "line-through",
                      opacity: 0.6,
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
          ))}
        </Box>
        <Box className={classes.boxchildren}>
          <Box
            className={classes.box}
            sx={{
              border: "1px solid #d6d6d5",
              width: "100%",
            }}
          >
            <input
              placeholder="Nhập mã khuyễn mãi..."
              style={{
                backgroundColor: "#f8f7f4",
                outline: "none",
                width: "100%",
                border: "none",
                padding: "16px 10px",
                textAlign: "center",
                fontSize: "16px",
                opacity: 0.8,
              }}
            />
            <button
              style={{
                textTransform: "uppercase",
                padding: "1px 20px",
                width: "140px",
                border: "none",
                borderLeft: "1px solid rgba(22,26,33,.15)",
                cursor: "pointer",
                backgroundColor: "#ecebea",
                fontWeight: 700,
                color: "#000",
                fontSize: "16px",
                height: "48px",
              }}
            >
              Áp dụng
            </button>
          </Box>
        </Box>
        <Box
          className={classes.boxchildren}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Box className={classes.box} sx={{ justifyContent: "space-between" }}>
            <Typography className={classes.textOpacity}>Thành tiền</Typography>
            <Typography sx={{ fontWeight: 700 }}>
              {" "}
              {totalPrice?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          </Box>
          <Box className={classes.box} sx={{ justifyContent: "space-between" }}>
            <Typography className={classes.textOpacity}>Mã giảm giá</Typography>
            <Typography sx={{ fontWeight: 700, color: "#ea4235" }}>
              0 ₫
            </Typography>
          </Box>
          <Box className={classes.box} sx={{ justifyContent: "space-between" }}>
            <Typography className={classes.textOpacity}>Phí ship</Typography>
            <Typography sx={{ fontWeight: 700 }}>0 ₫</Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", padding: "40px 0" }}>
          <Box className={classes.box} sx={{ justifyContent: "space-between" }}>
            <Typography
              className={classes.textOpacity}
              sx={{ textTransform: "uppercase" }}
            >
              Tổng:
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
              {totalPrice?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          </Box>
          <Box
            className={classes.box}
            sx={{ justifyContent: "space-between", marginTop: "10px" }}
          >
            <Typography sx={{ opacity: 0.4 }}>{`(Đã bao gồm VAT)`}</Typography>
            <Typography sx={{ opacity: 0.4 }}>
              hoặc{" "}
              {(totalPrice / 3)?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}{" "}
              x 3 kỳ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOutRight;
