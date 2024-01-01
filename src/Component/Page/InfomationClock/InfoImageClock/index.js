import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { IconSize, DataSize } from "../../../../mockData";
import imageSize from "../../../../Image/slidersize.jpg";
import { AiOutlineClose } from "react-icons/ai";
import Buttons from "../../../../helpek/Button";
import reqImage from "../../../../req/reqImage";
import { useHistory } from "react-router-dom";
import paths from "../../../../paths/paths";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      padding: "40px 16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      background: " linear-gradient(#dddfe2, transparent)",
    },
    box: { display: "flex", justifyContent: "center", alignItems: "center" },
    boxImage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "50px",
    },
    boxImageChildren: {
      width: "70px",
      height: "70px",
      borderRadius: "100%",
      backgroundColor: "#fff",
      border: "1px solid #333",
    },
    boxInfo: {
      maxWidth: "456px",
      width: "100%",
      background: " linear-gradient(#f8f7f4, transparent)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
    },
    boxPrice: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    boxSize: {
      backgroundColor: "rgba(120,120,119,0.4)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2,375px)",
    },
  })
);

const InfoImageClock = ({ clock, keyBrand, handleAddProductCart }) => {
  const classes = useStyle();
  const history = useHistory();
  const [openSize, setOpenSize] = useState(false);
  const priceSell = clock?.price - (clock?.price * clock?.sell) / 100;
  const installment = clock?.price / 3;
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxImage}>
        <Box>
          <Box className={classes.boxImageChildren}>
            <img
              src={reqImage(clock?.image)}
              alt="img"
              width={70}
              height={70}
            />
          </Box>
        </Box>
        <Box sx={{ maxWidth: "562px", width: "100%" }}>
          <img
            src={reqImage(clock?.image)}
            alt="img"
            style={{ maxWidth: "562px", width: "100%" }}
          />
        </Box>
      </Box>
      <Box className={classes.boxInfo}>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: 300,
              opacity: 0.7,
            }}
          >
            {keyBrand}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "32px",
              textTransform: "uppercase",
              fontWeight: 300,
              padding: "12px 0 24px",
            }}
          >
            {clock?.name}
          </Typography>
        </Box>
        <Box className={classes.boxPrice}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#161a21",
              fontWeight: "700",
            }}
          >
            {priceSell?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>
          {clock?.sell && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#a8a8a9",
                fontWeight: "500",
                textDecoration: "line-through",
              }}
            >
              {clock?.price?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          )}
        </Box>
        <Box sx={{ paddingTop: "16px" }}>
          <Typography sx={{ opacity: 0.7 }}>
            hoặc{" "}
            {installment?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}{" "}
            x 3 kỳ
          </Typography>
        </Box>
        <Box className={classes.box} sx={{ padding: "30px 0" }}>
          <Box
            sx={{
              fontSize: "14px",
              borderRight: "1px solid #d6d6d4",
              paddingRight: "16px",
            }}
          >
            Tình trạng:{" "}
            <b
              style={{
                color: " rgb(59, 177, 0)",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Còn hàng
            </b>
          </Box>
          <Box
            className={classes.box}
            sx={{ justifyContent: "unset", paddingLeft: "16px", gap: "10px" }}
          >
            <IconSize />
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{
                  fontStyle: "italic",
                  textDecoration: "underline",
                  opacity: 0.8,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => setOpenSize(true)}
              >
                Cỡ cổ tay
              </Typography>
              {openSize && (
                <Box className={classes.boxSize}>
                  <Box
                    className={classes.grid}
                    sx={{
                      maxWidth: "750px",
                      width: "100%",
                      backgroundColor: "#f8f7f4",
                    }}
                  >
                    <Box sx={{ padding: "24px 24px 0" }}>
                      <Box>
                        <Typography sx={{ fontSize: "20px" }}>
                          MẶT ĐỒNG HỒ
                        </Typography>
                        <Typography sx={{ opacity: 0.8 }}>
                          ĐỐI CHIỀU VỚI CHU VI CỔ TAY
                        </Typography>
                      </Box>
                      <Box sx={{ padding: "32px 0" }}>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            padding: "12px 20px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#161a21",
                              fontWeight: 700,
                            }}
                          >
                            Đồng hồ
                          </Typography>
                          <Typography
                            sx={{
                              marginLeft: "30px",
                              color: "#161a21",
                              fontWeight: 700,
                            }}
                          >
                            Cổ tay
                          </Typography>
                        </Box>
                        {DataSize.map((item) => (
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2,1fr)",
                              padding: "12px 20px",
                              backgroundColor: item?.color,
                            }}
                            key={item?.id}
                          >
                            <Typography
                              sx={{
                                color: "#161a21",
                                opacity: 0.8,
                              }}
                            >
                              {item?.name}
                            </Typography>
                            <Typography
                              sx={{
                                marginLeft: "30px",
                                color: "#161a21",
                                opacity: 0.8,
                              }}
                            >
                              {item?.size}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={imageSize}
                        alt="imgSize"
                        width={375}
                        height={"100%"}
                      />
                      <AiOutlineClose
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => setOpenSize(false)}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Buttons
          content={"Thanh toán ngay"}
          onClick={() => {
            handleAddProductCart(clock);
            setTimeout(() => {
              history.push(paths.checkout);
            }, 200);
          }}
          classes={{
            width: "100%",
            textTransform: "uppercase",
            backgroundColor: "#53c66e",
            "&:hover": {
              backgroundColor: "#53c66e",
              opacity: 0.8,
            },
          }}
        />
        <Buttons
          content={"Thêm vào giỏ"}
          onClick={() => handleAddProductCart(clock)}
          classes={{
            width: "100%",
            textTransform: "uppercase",
            marginTop: "10px",
            color: "#161a21",
            border: "1px solid #161a21",
            "&:hover": {
              backgroundColor: "#161a21",
              opacity: 0.8,
              color: "#fff",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default InfoImageClock;
