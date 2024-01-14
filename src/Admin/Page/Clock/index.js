import React, { useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Buttons from "../../../helpek/Button";
import { FaPlus, FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnClockReq, getClockReq } from "../../../store/action/clockAction";
import { getBrandReq } from "../../../store/action/brandAction";
import reqImage from "../../../req/reqImage";
import CUClock from "./CUClock";
import AnClock from "./AnClock";
import SnackBar from "../../../helpek/SnackBar";
import { deleteClock } from "../../../store/saga/watchClockSaga";

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
  })
);

const Clock = () => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const { clocks, loading, clock } = useSelector(
    (state) => state.watchClockReducer
  );
  const { brands } = useSelector((state) => state.watchBrandReducer);
  const match = useRouteMatch();
  const { key, id } = match.params;
  const iconCss = {
    color: "#000",
    fontSize: "20px",
    cursor: "pointer",
  };
  const initialValue = {
    image: "",
    name: "",
    brand: "6554c70f16bc90b914cef7b6",
    price: 0,
    sizeFace: "",
    thickness: "",
    colorFace: "",
    genres: "Nam",
    sizeWire: "",
    Waterproof: "",
    faceGlasses: "",
    wireMaterial: "",
    genresClock: "",
    sell: "",
    quantity: 0,
    desc: "",
  };
  const [value, setValue] = useState(initialValue);
  const [snack, setSnack] = useState({
    open: false,
    error: false,
    message: "",
  });
  useEffect(() => {
    dispatch(getBrandReq());
    dispatch(getClockReq());

    if (id) {
      dispatch(getAnClockReq(id));
      dispatch(getBrandReq());
    }
    return;
  }, [dispatch, id]);
  useEffect(() => {
    if (Object.keys(clock).length !== 0) {
      setValue(clock);
    }
  }, [clock]);

  const handleDeleteClock = async (clockId) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        const response = await deleteClock(clockId);
        dispatch(getClockReq());
        if (response.status === 200) {
          setSnack({
            open: true,
            error: false,
            message: "Xóa sản phẩm thành công.",
          });
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Xóa sản phẩm không thành công.",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        error: true,
        message: "Xóa sản phẩm không thành công.",
      });
    }
  };
  switch (key) {
    case "update":
    case "create":
      return (
        <>
          <CUClock
            brands={brands}
            loading={loading}
            keyClock={key}
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
          {id ? (
            <AnClock clock={clock} loading={loading} />
          ) : (
            <Box className={classes.wrap}>
              <Box className={classes.boxTitle}>
                <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                  Danh sách sản phẩm
                </Typography>
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
                    setValue(initialValue);
                  }}
                />
              </Box>
              <Box className={classes.boxList}>
                <Box sx={{ marginBottom: "25px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                  />
                </Box>
                <TableContainer>
                  {loading ? (
                    <Box sx={{ width: "100%" }}>
                      <Skeleton variant="rounded" height={100} />
                    </Box>
                  ) : (
                    <Table>
                      <TableHead sx={{ backgroundColor: "#FAFBFE" }}>
                        <TableRow>
                          <TableCell>Stt</TableCell>
                          <TableCell align="center">Tên </TableCell>
                          <TableCell align="center">Ảnh </TableCell>
                          <TableCell align="center">Thương hiệu</TableCell>
                          <TableCell align="center">Giới tính</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {clocks?.map((item, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={item?._id}
                          >
                            <TableCell component="th" scope="row">
                              {index}
                            </TableCell>
                            <TableCell align="center">{item?.name}</TableCell>
                            <TableCell align="center">
                              <img
                                src={reqImage(item?.image)}
                                alt="img"
                                width={100}
                                height={100}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {item?.brand?.name}
                            </TableCell>
                            <TableCell align="center">{item?.genres}</TableCell>
                            <TableCell align="center">
                              {item?.quantity}
                            </TableCell>

                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "14px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  className={classes.hover}
                                  onClick={() => {
                                    history.push(
                                      `/admin/clock/home/${item?._id}`
                                    );
                                  }}
                                >
                                  <FaEye style={{ ...iconCss }} />
                                </Box>
                                <Box
                                  className={classes.hover}
                                  onClick={() => {
                                    history.push(
                                      `/admin/clock/update/${item?._id}`
                                    );
                                  }}
                                >
                                  <FaPencilAlt style={{ ...iconCss }} />
                                </Box>
                                <Box
                                  className={classes.hover}
                                  onClick={() => handleDeleteClock(item?._id)}
                                >
                                  <FaTrash style={{ ...iconCss }} />
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Box>
            </Box>
          )}
          <SnackBar snack={snack} setSnack={setSnack} />
        </>
      );
    default:
      return;
  }
};

export default Clock;
