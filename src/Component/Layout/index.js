import React, { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, createStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { FaAngleUp } from "react-icons/fa";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      scrollBehavior: "smooth",
    },
    boxScroll: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#7c7b7a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      bottom: "60px",
      right: "30px",
      cursor: "pointer",
    },
  })
);

export const ValueContext = createContext();
const Layout = ({ children, type }) => {
  const classes = useStyle();
  const handleScroll = () => {
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [productCart, setProductCart] = useState(() => {
    const getLocastorage = JSON.parse(localStorage.getItem("productCart"));
    if (getLocastorage !== null) {
      return getLocastorage;
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("productCart", JSON.stringify(productCart));
  }, [productCart]);
  const handleAddProductCart = (productItem) => {
    try {
      const productExist = productCart.find(
        (item) => item?._id === productItem?._id
      );
      if (productExist) {
        setProductCart(
          productCart.map((item) =>
            item?._id === productItem?._id
              ? { ...productExist, count: productExist.count + 1 }
              : item
          )
        );
      } else {
        setProductCart([...productCart, { ...productItem, count: 1 }]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCart = (clockId) => {
    setProductCart(productCart.filter((item) => item?._id !== clockId));
  };
  const handleIncrease = (clock) => {
    setProductCart(
      productCart.map((item) =>
        item?._id === clock?._id ? { ...clock, count: clock?.count + 1 } : item
      )
    );
  };
  const handleReduce = (clock) => {
    setProductCart(
      productCart.map((item) =>
        item?._id === clock?._id
          ? {
              ...clock,
              count: clock?.count > 1 ? clock?.count - 1 : 1,
            }
          : item
      )
    );
  };
  const values = {
    productCart,
    setProductCart,
    handleAddProductCart,
    handleDeleteCart,
    handleIncrease,
    handleReduce,
  };
  return (
    <ValueContext.Provider value={values}>
      {type ? (
        <Box className={classes.wrap}>{children}</Box>
      ) : (
        <Box className={classes.wrap}>
          <Header />
          {children}
          <Footer />
          <Box className={classes.boxScroll} onClick={handleScroll}>
            <FaAngleUp style={{ color: "#fff", fontSize: "20px" }} />
          </Box>
        </Box>
      )}
    </ValueContext.Provider>
  );
};

export default Layout;
