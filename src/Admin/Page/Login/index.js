import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import login from "../../../Image/login.jpg";
import Buttons from "../../../helpek/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginReq } from "../../../store/action/loginAction";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      height: "100vh",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    boxLogin: {
      maxWidth: "600px",
      width: "100%",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 40px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "10px",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      padding: "70px 40px",
    },
    boxContent: {
      maxWidth: "400px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
    },
  })
);

const Login = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const errorLogin = useSelector((state) => state.watchLoginReducer.errorLogin);
  const initialValue = {
    userName: "",
    password: "",
  };
  const [value, setValue] = useState(initialValue);
  const handleOnchange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (value.userName !== "" && value.password !== "") {
        dispatch(loginReq(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.wrap}>
      <img src={login} alt="img" style={{ width: "100%", height: "99.6vh" }} />
      <Box className={classes.boxLogin}>
        <form className={classes.boxContent} onSubmit={handleSubmit}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 700,
              opacity: 1,
            }}
          >
            Login
          </Typography>
          <TextField
            variant="outlined"
            label="Username"
            name="userName"
            onChange={handleOnchange}
            fullWidth
          />
          <TextField
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            onChange={handleOnchange}
            fullWidth
          />
          <Buttons
            content={"Login"}
            type={"submit"}
            classes={{
              color: "#161a21",
              border: "1px solid #b0b0b2",
              borderRadius: "4px",
            }}
          />
          {errorLogin && (
            <Typography sx={{ color: " #d74242", fontWeight: "500" }}>
              Tài khoản hoặc mặt khẩu không chính xác !
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login;
