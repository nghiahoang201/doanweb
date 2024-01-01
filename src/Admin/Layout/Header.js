import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import logo from "../../Image/logo.svg";
import { ValueContextAdmin } from ".";
import { useHistory } from "react-router-dom";
import reqImage from "../../req/reqImage";
import { AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      height: "80px",
      borderBottom: "1px solid #cacbca",
      padding: "0 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    boxAvatar: {
      height: "32px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "14px",
      cursor: "pointer",
      position: "relative",
    },
    boxAdmin: {
      width: "160px",
      borderRadius: "2px",
      position: "absolute",
      top: "32px",
      display: "none",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      zIndex: 50,
    },
    boxAdminChildren: {
      padding: "10px 20px",
      "&:hover": {
        backgroundColor: "#ccc",
      },
    },
    box: {
      display: "flex",
      gap: "8px",
    },
  })
);

const Header = () => {
  const classes = useStyle();
  const history = useHistory();
  const { user } = useContext(ValueContextAdmin);
  const handleLogOut = () => {
    history.push("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("dataUser");
    localStorage.removeItem("isLogin");
  };

  const textAdmin = [
    {
      id: 1,
      text: "Hồ sơ",
      icon: <AiOutlineUser />,
      action: () => {
        history.push("/admin/user/info");
      },
    },
    {
      id: 2,
      text: "Đổi mật khẩu",
      icon: <MdPassword />,
      action: () => {
        history.push("/admin/user/updatePassword");
      },
    },
    {
      id: 3,
      text: "Đăng xuất",
      icon: <GiExitDoor />,
      action: () => {
        handleLogOut();
      },
    },
  ];
  return (
    <Box className={classes.wrap}>
      <Box onClick={() => history.push("/admin")}>
        <img src={logo} alt="logo" style={{ cursor: "pointer" }} />
      </Box>
      <Box
        className={classes.boxAvatar}
        sx={{
          "&:hover > .menu": {
            display: "block",
          },
        }}
      >
        <img
          src={reqImage(user?.image)}
          alt="avatar"
          style={{ width: "32px", height: "32px", borderRadius: "100%" }}
        />
        <Box>
          <Typography sx={{ fontSize: "14px" }}>{user?.name}</Typography>
        </Box>
        <Box className={`${classes.boxAdmin} menu`}>
          {textAdmin.map((item) => (
            <Box className={classes.boxAdminChildren} key={item?.id}>
              <Box className={classes.box} onClick={() => item?.action()}>
                {item?.icon}
                <Typography sx={{ fontSize: "14px" }}>{item?.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
