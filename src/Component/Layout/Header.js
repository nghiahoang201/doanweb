import React, { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Badge, Box, TextField, Typography } from "@mui/material";
import logo from "../../Image/logo.svg";
import {
  AiOutlineShopping,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Cart from "../../helpek/Cart";
import Menu from "../../helpek/Menu";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandReq } from "../../store/action/brandAction";
import { ValueContext } from ".";
import { searchText } from "../../mockData";
import Card from "../../helpek/Card";
const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },
    header: {
      width: "100%",
      height: "80px",
      display: "flex",
      justifyContent: "space-between",
      padding: "0 100px",
      position: "fixed",
      backgroundColor: "#f8f7f4",
      borderBottom: "1px solid #cacbca",
      top: 0,
      zIndex: 100,
    },
    box: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(5,120px)",
      gap: "36px",
      justifyContent: "center",
      alignItems: "center",
    },
    Text: {
      fontSize: "15px !important",
      cursor: "pointer",
      color: "rgba(0,0,0,0.6)",
      "&:hover": {
        color: "#9e9fa0",
      },
    },
    menu: {
      width: "100%",
      backgroundColor: "#f8f7f4",
      height: "430px",
      position: "absolute",
      top: 80,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid #cacbca",
    },
    search: {
      position: "fixed",
      top: "80px",
      left: 0,
      right: 0,
      width: "100%",
      background: "#f8f7f4",
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      borderBottom: "1px solid #cacbca",
    },
    boxCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "60px 24px",
      flexWrap: "wrap",
      padding: "20px 0 20px 0",
      height: "450px",
      overflowY: "auto",
    },
  })
);
const Header = () => {
  const classes = useStyle();
  const {
    productCart,
    setProductCart,
    handleAddProductCart,
    handleDeleteCart,
    handleIncrease,
    handleReduce,
  } = useContext(ValueContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.watchBrandReducer);
  const [openCart, setOpenCart] = useState(false);
  const [searchs, setSearchs] = useState({ result: "", hide: false });
  useEffect(() => {
    dispatch(getBrandReq());
  }, [dispatch]);

  const totalPrice = productCart.reduce(
    (price, item) =>
      price + (item?.price - (item?.price * item?.sell) / 100) * item?.count,
    0
  );

  const brandSearch = brands.filter(
    (item) => item?.name?.toUpperCase() === searchs?.result?.toUpperCase()
  )[0];
  return (
    <Box className={classes.wrap}>
      <Box className={classes.header}>
        <Box
          className={classes.box}
          sx={{
            gap: "50px",
          }}
        >
          <Box
            className={classes.box}
            sx={{
              height: "100%",
              "&:hover > .menu": {
                display: "flex",
              },
            }}
          >
            <Typography
              className={classes.Text}
              sx={{
                textTransform: "uppercase",
              }}
            >
              Nam giới
            </Typography>
            <Box className={`${classes.menu} menu`}>
              <Box className={classes.grid} sx={{ width: "1240px" }}>
                {brands?.map(
                  (item) =>
                    item?.genres === "Nam" && (
                      <Box key={item?._id}>
                        <Menu brand={item} />
                      </Box>
                    )
                )}
              </Box>
            </Box>
          </Box>
          <Box
            className={classes.box}
            sx={{
              height: "100%",
              "&:hover > .menu": {
                display: "flex",
              },
            }}
          >
            <Typography
              className={classes.Text}
              sx={{
                textTransform: "uppercase",
              }}
            >
              Nữ giới
            </Typography>
            <Box className={`${classes.menu} menu`}>
              <Box className={classes.grid} sx={{ width: "1240px" }}>
                {brands?.map(
                  (item) =>
                    item?.genres === "Nu" && (
                      <Box key={item?._id}>
                        <Menu brand={item} />
                      </Box>
                    )
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => history.push("/")}
        >
          <img src={logo} alt="logo" />
        </Box>
        <Box className={classes.box} sx={{ gap: "30px" }}>
          <Box
            className={classes.box}
            sx={{
              gap: "10px",
              cursor: "pointer",
              "&:hover": {
                color: "#9e9fa0 ",
              },
            }}
            onClick={() => setOpenCart(true)}
          >
            <Typography
              className={classes.Text}
              sx={{ textTransform: "uppercase" }}
            >
              Giỏ hàng
            </Typography>
            <Badge badgeContent={productCart?.length} color="secondary">
              <AiOutlineShopping style={{ fontSize: "24px" }} />
            </Badge>
          </Box>
          <Box>
            <AiOutlineSearch
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => setSearchs({ result: "", hide: true })}
            />
          </Box>
        </Box>
      </Box>
      <Cart
        openCart={openCart}
        setOpenCart={setOpenCart}
        productCart={productCart}
        setProductCart={setProductCart}
        totalPrice={totalPrice}
        handleDeleteCart={handleDeleteCart}
        handleIncrease={handleIncrease}
        handleReduce={handleReduce}
      />
      {searchs.hide && (
        <Box className={classes.search}>
          <Box
            className={classes.box}
            sx={{
              maxWidth: "1240px",
              width: "100%",
              flexDirection: "column",
              padding: "24px",
              gap: "40px",
            }}
          >
            <Box
              className={classes.box}
              sx={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography></Typography>
              <Box
                sx={{ maxWidth: "570px", width: "100%", position: "relative" }}
              >
                <TextField
                  variant="standard"
                  sx={{ width: "100%", padding: "2px" }}
                  value={searchs.result}
                  onChange={(e) =>
                    setSearchs({ result: e.target.value, hide: true })
                  }
                />
                {searchs.result && (
                  <AiOutlineClose
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setSearchs({ result: "", hide: true })}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setSearchs({ result: "", hide: false })}
              >
                Đóng
              </Typography>
            </Box>
            {brandSearch ? (
              <Box className={classes.boxCard} sx={{ width: "1240px" }}>
                {brandSearch?.clocks?.map((clock) => (
                  <Box key={clock?._id}>
                    <Card
                      clock={clock}
                      handleAddProductCart={handleAddProductCart}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                className={classes.box}
                sx={{ flexDirection: "column", gap: "20px", marginTop: "14px" }}
              >
                <Typography sx={{ opacity: 0.6 }}>
                  CÁC TỪ KHÓA NỔI BẬT:
                </Typography>
                {searchText.map((item, index) => (
                  <Box key={index}>
                    <Typography
                      key={index}
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSearchs({ result: item, hide: true })}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
