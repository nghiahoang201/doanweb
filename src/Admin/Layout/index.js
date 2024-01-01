import React, { createContext, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Header from "./Header";
import Navbar from "./Navbar";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      height: "100vh",
      display: "flex",
      backgroundColor: "#fff",
      overflowY: "auto",
    },
    box: {
      width: "100%",
      height: "100vh",
      overflowY: "auto",
    },
  })
);
export const ValueContextAdmin = createContext();
const Layout = ({ children }) => {
  const classes = useStyle();
  const [user, setUser] = useState(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
    if (userLocalStorage) {
      return userLocalStorage;
    } else {
      return {};
    }
  });
  const values = { user, setUser };
  return (
    <ValueContextAdmin.Provider value={values}>
      <Box className={classes.wrap}>
        <Navbar />
        <Box className={classes.box}>
          <Header />
          <Box>{children}</Box>
        </Box>
      </Box>
    </ValueContextAdmin.Provider>
  );
};

export default Layout;
