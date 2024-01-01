import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Buttons from "../../helpek/Button";
import { FooterInfomation, location, payOnline } from "../../mockData";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      padding: "50px 20px 100px",
      marginTop: "80px",
      borderTop: "1px solid #cacbca",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
    },
    iconInfomation: {
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      backgroundColor: "#161a21",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  })
);

const Footer = () => {
  const classes = useStyle();
  return (
    <Box className={classes.wrap}>
      <Box
        className={classes.box}
        sx={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "unset",
          flexWrap: "wrap",
        }}
      >
        <Box
          className={classes.box}
          sx={{ alignItems: "unset", justifyContent: "unset" }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#161a21",
              fontWeight: 500,
            }}
          >
            NHẬN THÔNG TIN MỚI NHẤT TỪ CURNON
          </Typography>
          <Box className={classes.box} sx={{ gap: "16px" }}>
            <Box
              className={classes.box}
              sx={{ flexDirection: "row", width: "100%" }}
            >
              <FormControl sx={{ width: "160px" }}>
                <InputLabel>Giới tính</InputLabel>
                <Select label="Giới tính">
                  <MenuItem value={"nam"}>Nam</MenuItem>
                  <MenuItem value={"nu"}>Nữ</MenuItem>
                </Select>
              </FormControl>
              <TextField variant="outlined" placeholder="Họ tên..." fullWidth />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField variant="outlined" placeholder="Email..." fullWidth />
            </Box>
            <Buttons
              content={"Đăng ký ngay"}
              classes={{
                backgroundColor: "#87888a",
                color: "#f8f7f4",
                width: "100%",
                "&:hover": {
                  opacity: 0.8,
                  backgroundColor: "#87888a",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          className={classes.box}
          sx={{ alignItems: "unset", justifyContent: "unset" }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                textTransform: "uppercase",
                color: "#161a21",
                fontWeight: 500,
              }}
            >
              LIÊN LẠC
            </Typography>
          </Box>
          <Box
            className={classes.box}
            sx={{ gap: "10px", justifyContent: "unset", alignItems: "unset" }}
          >
            <Box>
              <Typography sx={{ opacity: 0.7 }}>
                cskh@curnonwatch.com
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ opacity: 0.7 }}>0868889103</Typography>
            </Box>
          </Box>
          <Box
            className={classes.box}
            sx={{ flexDirection: "row", gap: "10px", justifyContent: "start" }}
          >
            {FooterInfomation.map((item) => (
              <Box key={item?.id} className={classes.iconInfomation}>
                {item?.icon}
              </Box>
            ))}
          </Box>
          <Box
            className={classes.box}
            sx={{ flexDirection: "row", gap: "10px", justifyContent: "start" }}
          >
            {payOnline.map((item) => (
              <img
                src={item?.imagePay}
                alt="imgPay"
                width={50}
                height={50}
                key={item?.id}
              />
            ))}
          </Box>
        </Box>
        <Box
          className={classes.box}
          sx={{ alignItems: "unset", justifyContent: "unset" }}
        >
          {location.map((item) => (
            <Box
              className={classes.box}
              sx={{ alignItems: "unset", justifyContent: "unset" }}
              key={item?.id}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    color: "#161a21",
                    fontWeight: 500,
                  }}
                >
                  {item?.address}
                </Typography>
              </Box>
              <Box
                className={classes.box}
                sx={{
                  alignItems: "unset",
                  justifyContent: "unset",
                  gap: "14px",
                }}
              >
                {item?.addressChildren?.map((itemChildren, index) => (
                  <Typography sx={{ opacity: 0.7 }} key={index}>
                    {itemChildren}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
