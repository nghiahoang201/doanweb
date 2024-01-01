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
import logo from "../../../../Image/logo.svg";
import { useHistory } from "react-router-dom";
import Buttons from "../../../../helpek/Button";
import paths from "../../../../paths/paths";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      padding: "70px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      width: "50%",
      height: "100vh",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "571px",
      width: "100%",
    },
    text: {
      width: "100%",
    },
    error: {
      color: "#f80000",
      fontSize: "12px !important",
    },
  })
);

const CheckOutLeft = ({
  provinces,
  districts,
  wards,
  payOnline,
  handlePayment,
  handleOnchange,
  errorValue,
  handleOnblur,
  handleCreateCustomer,
}) => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <form className={classes.wrap} onSubmit={handleCreateCustomer}>
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
        THÔNG TIN KHÁCH HÀNG
      </Typography>
      <Box
        className={classes.box}
        sx={{ flexDirection: "column", gap: "20px" }}
      >
        <Box className={classes.text}>
          <TextField
            variant="outlined"
            name="email"
            placeholder="Email"
            fullWidth
            className={classes.text}
            onChange={handleOnchange}
            onBlur={handleOnblur}
          />
          {errorValue?.email && (
            <Box>
              <Typography className={classes.error}>
                {errorValue?.email}
              </Typography>
            </Box>
          )}
        </Box>
        <Box className={classes.box} sx={{ gap: "20px", width: "100%" }}>
          <Box className={classes.text}>
            <TextField
              variant="outlined"
              placeholder="Họ tên"
              name="name"
              className={classes.text}
              onChange={handleOnchange}
              onBlur={handleOnblur}
            />
            {errorValue?.name && (
              <Box>
                <Typography className={classes.error}>
                  {errorValue?.name}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className={classes.text}>
            <TextField
              variant="outlined"
              name="phone"
              placeholder="Số điện thoại"
              className={classes.text}
              onChange={handleOnchange}
              onBlur={handleOnblur}
            />
            {errorValue?.phone && (
              <Box>
                <Typography className={classes.error}>
                  {errorValue?.phone}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.box} sx={{ gap: "20px", width: "100%" }}>
          <Box className={classes.text}>
            <TextField
              variant="outlined"
              name="address"
              placeholder="Địa chỉ nhận hàng"
              className={classes.text}
              onChange={handleOnchange}
              onBlur={handleOnblur}
            />
            {errorValue?.address && (
              <Box>
                <Typography className={classes.error}>
                  {errorValue?.address}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className={classes.text}>
            <FormControl className={classes.text}>
              <InputLabel>Tỉnh, Thành phố</InputLabel>
              <Select
                label="Tỉnh thành phố"
                variant="outlined"
                name="province"
                placeholder="Tỉnh thành phố..."
                onChange={handleOnchange}
                onBlur={handleOnblur}
              >
                {provinces?.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errorValue?.province && (
              <Box>
                <Typography className={classes.error}>
                  {errorValue?.province}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.box} sx={{ gap: "20px", width: "100%" }}>
          <Box className={classes.text}>
            <FormControl className={classes.text}>
              <InputLabel>Quận, Huyện</InputLabel>
              <Select
                label="Quận, Huyện"
                variant="outlined"
                name="district"
                placeholder="Quận, Huyện..."
                onChange={handleOnchange}
                onBlur={handleOnblur}
              >
                {districts?.districts?.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errorValue?.district && (
              <Box>
                <Typography className={classes.error}>
                  {errorValue?.district}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className={classes.text}>
            <FormControl className={classes.text}>
              <InputLabel>Phường</InputLabel>
              <Select
                label="Phường"
                variant="outlined"
                name="ward"
                placeholder="Phường..."
                onChange={handleOnchange}
                onBlur={handleOnblur}
              >
                {wards?.wards?.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errorValue?.ward && (
              <Box>
                <Typography className={classes.error}>
                  {errorValue?.ward}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <TextField
          variant="outlined"
          name="desc"
          placeholder="Nhập ghi chú nếu cần"
          multiline
          rows={4}
          className={classes.text}
          onChange={handleOnchange}
        />
        <Typography>
          *Phương thức vận chuyển là{" "}
          <b style={{ textTransform: "uppercase", color: "#58c772" }}>
            FREESHIP
          </b>{" "}
          với đơn hàng từ 700.000đ
        </Typography>
        {payOnline ? (
          <Buttons
            content={"Thanh toán online"}
            onClick={() => handlePayment()}
            classes={{
              backgroundColor: "#53c66e",
              borderRadius: "10px",
              marginTop: "40px",
              "&:hover": {
                backgroundColor: "#53c66e",
                opacity: 0.8,
              },
            }}
          />
        ) : (
          <Buttons
            content={"Đặt hàng ngay"}
            type={"Submit"}
            classes={{
              backgroundColor: "#53c66e",
              borderRadius: "10px",
              marginTop: "40px",
              "&:hover": {
                backgroundColor: "#53c66e",
                opacity: 0.8,
              },
            }}
          />
        )}
      </Box>
    </form>
  );
};

export default CheckOutLeft;
