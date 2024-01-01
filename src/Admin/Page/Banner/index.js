import React, { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Buttons from "../../../helpek/Button";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../../../helpek/SnackBar";
import Slider from "../../../helpek/Slider";
import {
  getAnBannerReq,
  getBannerReq,
} from "../../../store/action/bannerAction";
import CUBanner from "./CUBanner";
import { deleteBanner } from "../../../store/saga/watchBannerSaga";

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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
  })
);

const SliderAdmin = () => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const { banners, loadingBanner, banner } = useSelector(
    (state) => state.watchBannerReducer
  );
  const match = useRouteMatch();
  const { key, id } = match.params;
  const path = window.location.href;
  const initialValue = {
    image: "",
    preTitle: "",
    title: "",
    desc: "",
  };
  const [value, setValue] = useState(initialValue);
  const [snack, setSnack] = useState({
    open: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (path === "http://localhost:3000/admin/banner/home") {
      dispatch(getBannerReq());
    }
    if (id) {
      dispatch(getAnBannerReq(id));
    }
    return;
  }, [dispatch, id, path]);

  useEffect(() => {
    if (Object.keys(banner).length !== 0) {
      setValue(banner);
    }
  }, [banner]);

  const handleDeleteBanner = async (bannerId) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa banner này ?")) {
        const response = await deleteBanner(bannerId);
        dispatch(getBannerReq());
        if (response.status === 200) {
          setSnack({
            open: true,
            error: false,
            message: "Xóa banner thành công.",
          });
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Xóa banner không thành công.",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        error: true,
        message: "Xóa banner không thành công.",
      });
    }
  };

  switch (key) {
    case "update":
    case "create":
      return (
        <>
          <CUBanner
            banner={banner}
            loadingBanner={loadingBanner}
            keyBanner={key}
            value={value}
            setValue={setValue}
            setSnack={setSnack}
          />
          <SnackBar snack={snack} setSnack={setSnack} />
        </>
      );
    case "home":
      return (
        <>
          <Box className={classes.wrap}>
            <Box className={classes.boxTitle}>
              <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                Thông tin chi tiết banner
              </Typography>
            </Box>
            <Box className={classes.boxList}>
              {loadingBanner ? (
                <Skeleton variant="rounded" width={"100%"} height={"600px"} />
              ) : banners && banners.length === 0 ? (
                <Buttons
                  content={"Thêm"}
                  startIcon={
                    <FaPlus
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
                    history.push("create");
                  }}
                />
              ) : (
                banners?.map((item) => (
                  <Box key={item?._id}>
                    <Slider banners={banners} loadingBanner={loadingBanner} />
                    <Box>
                      <Buttons
                        content={"Sửa"}
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
                          history.push(`update/${item?._id}`);
                        }}
                      />
                      <Buttons
                        content={"Xóa"}
                        startIcon={
                          <FaTrash
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
                          handleDeleteBanner(item?._id);
                        }}
                      />
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          <SnackBar snack={snack} setSnack={setSnack} />
        </>
      );
    default:
      return;
  }
};

export default SliderAdmin;
