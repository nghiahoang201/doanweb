import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Buttons from "../../../helpek/Button";
import { FaPencilAlt } from "react-icons/fa";
import { useRouteMatch, useHistory } from "react-router-dom";
import reqImage from "../../../req/reqImage";
import SnackBar from "../../../helpek/SnackBar";
import {
  getUser,
  updatePassword,
  updateUser,
} from "../../../store/saga/watchLoginSaga";
import { ValueContextAdmin } from "../../Layout";
import File from "../../../helpek/File";
import {
  handleValuePassword,
  handleValueUser,
} from "../../../helpek/handleValue";

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
    flexBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
    error: {
      color: "#f80000",
    },
  })
);

const UserAdmin = () => {
  const classes = useStyle();
  const { user, setUser } = useContext(ValueContextAdmin);
  const history = useHistory();
  const match = useRouteMatch();
  const { key } = match.params;
  const initalValue = {
    image: "",
    name: "",
    email: "",
  };
  const initalValuePassword = {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  const [value, setValue] = useState(initalValue);
  const [valuePassword, setValuePassword] = useState(initalValuePassword);
  const [dataUser, setDataUser] = useState({});
  const [errorValue, setErrorValue] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [snack, setSnack] = useState({
    open: false,
    error: false,
    message: "",
  });
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setValue(user);
    }
    if (Object.keys(dataUser).length > 0) {
      localStorage.setItem("dataUser", JSON.stringify(dataUser));
      setUser(dataUser);
    }
  }, [user, dataUser, setUser]);

  useEffect(() => {
    setErrorValue(handleValueUser(value));
    setErrorPassword(handleValuePassword(valuePassword));
  }, [value, valuePassword]);
  const handleOnchange = (e) => {
    try {
      if (e.target.name === "image" || e.target.name === "banner") {
        setValue({ ...value, [e.target.name]: e.target.files[0] });
      } else {
        setValue({ ...value, [e.target.name]: e.target.value });
        setValuePassword({ ...valuePassword, [e.target.name]: e.target.value });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", value?.image);
      formData.append("name", value?.name);
      formData.append("email", value?.email);
      if (
        Object.values(value).every((item) => item !== "") &&
        Object.values(errorValue).every((item) => !item)
      ) {
        const response = await updateUser({ userId: value?._id, formData });
        if (response.status === 200) {
          const getUserLoca = await getUser(value?._id);
          setDataUser(getUserLoca?.data);
          setSnack({
            open: true,
            error: false,
            message: "Cập nhập thông tin người dùng thành công",
          });
          localStorage.setItem("dataUser", JSON.stringify(value));
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Cập nhập thông tin người dùng không thành công",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        error: true,
        message: "Cập nhập thông tin người dùng không thành công",
      });
    }
  };
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (
        Object.values(valuePassword).every((item) => item !== "") &&
        Object.values(errorPassword).every((item) => !item)
      ) {
        const response = await updatePassword({
          userId: user?._id,
          formData: valuePassword,
        });
        if (response.status === 200) {
          setSnack({
            open: true,
            error: false,
            message: "Cập nhập mật khẩu thành công",
          });
          localStorage.setItem("dataUser", JSON.stringify(value));
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Cập nhập mật khẩu không thành công",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        error: true,
        message: "Cập nhập mật khẩu không thành công",
      });
    }
  };
  switch (key) {
    case "info":
      return (
        <Box className={classes.wrap}>
          <Box className={classes.boxTitle}>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              Thông tin chi tiết người dùng
            </Typography>
            <Buttons
              content={"Cập nhập"}
              startIcon={
                <FaPencilAlt
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                />
              }
              classes={{
                backgroundColor: "#161a21",
                padding: "10px 30px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#161a21",
                  opacity: 0.9,
                },
              }}
              onClick={() => {
                history.push("update");
              }}
            />
          </Box>
          <Box className={classes.boxList}>
            <Box sx={{ marginBottom: "25px" }}>
              <Box className={classes.box}>
                <Typography> Ảnh:</Typography>
                <img
                  src={reqImage(user?.image)}
                  alt="img"
                  width={100}
                  height={100}
                />
              </Box>
              <Box className={classes.box}>
                <Typography> Tên: {user?.name}</Typography>
              </Box>
              <Box className={classes.box}>
                <Typography> Email: {user?.email}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    case "update":
      return (
        <Box className={classes.wrap}>
          <Box className={classes.boxTitle}>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              Cập nhập thông tin người dùng
            </Typography>
          </Box>
          <Box className={classes.boxList}>
            <form onSubmit={handleUpdate}>
              <Box className={classes.box}>
                <Typography> Ảnh:</Typography>
                <File
                  type={"image"}
                  image={reqImage(user?.image)}
                  handleOnchange={handleOnchange}
                />
                {errorValue?.image && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.image}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Tên:</Typography>
                <TextField
                  size="small"
                  name="name"
                  required
                  value={value?.name}
                  onChange={handleOnchange}
                />
                {errorValue?.name && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.name}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Email:</Typography>
                <TextField
                  size="small"
                  name="email"
                  type="email"
                  required
                  value={value?.email}
                  onChange={handleOnchange}
                />
                {errorValue?.email && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.email}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Buttons
                type={"submit"}
                content={"Cập nhật"}
                classes={{
                  backgroundColor: "#FF9F43",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#FF9F43",
                    opacity: 0.8,
                  },
                }}
              />
            </form>
          </Box>
          <SnackBar snack={snack} setSnack={setSnack} />
        </Box>
      );
    case "updatePassword":
      return (
        <Box className={classes.wrap}>
          <Box className={classes.boxTitle}>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              Thay đổi mật khẩu
            </Typography>
          </Box>
          <Box className={classes.boxList}>
            <form onSubmit={handleUpdatePassword}>
              <Box className={classes.box}>
                <Typography> Mật khẩu cũ:</Typography>
                <TextField
                  size="small"
                  name="password"
                  type="password"
                  required
                  value={valuePassword?.password}
                  onChange={handleOnchange}
                />
                {errorPassword?.password && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorPassword?.password}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Nhập mật khẩu mới:</Typography>
                <TextField
                  size="small"
                  name="newPassword"
                  type="password"
                  required
                  value={valuePassword?.newPassword}
                  onChange={handleOnchange}
                />
                {errorPassword?.newPassword && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorPassword?.newPassword}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Nhập lại mật khẩu mới:</Typography>
                <TextField
                  size="small"
                  name="repeatNewPassword"
                  type="password"
                  required
                  value={valuePassword?.repeatNewPassword}
                  onChange={handleOnchange}
                />
                {errorPassword?.repeatNewPassword && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorPassword?.repeatNewPassword}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Buttons
                type={"submit"}
                content={"Cập nhật"}
                classes={{
                  backgroundColor: "#FF9F43",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#FF9F43",
                    opacity: 0.8,
                  },
                }}
              />
            </form>
          </Box>
          <SnackBar snack={snack} setSnack={setSnack} />
        </Box>
      );
    default:
      return;
  }
};

export default UserAdmin;
