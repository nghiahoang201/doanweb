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
import { FaTrash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomer,
  getAnCustomer,
} from "../../../store/action/customerAction";
import {
  deleteCustomer,
  updateCustomer,
} from "../../../store/saga/watchCustomerSage";
import SnackBar from "../../../helpek/SnackBar";
import { useHistory, useRouteMatch } from "react-router-dom";
import AnOrder from "./AnOrder";
import { updateClock } from "../../../store/saga/watchClockSaga";
import { createStatistics } from "../../../store/saga/watchStatisticsSaga";

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
  })
);

const Order = () => {
  const classes = useStyle();
  const iconCss = {
    color: "#000",
    fontSize: "20px",
    cursor: "pointer",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const { key, id } = match.params;
  const { customers, customer, loadingCustomer } = useSelector(
    (state) => state.watchCustomerReducer
  );
  const [snack, setSnack] = useState({
    open: false,
    error: false,
    message: "",
  });
  const path = window.location.href;
  useEffect(() => {
    if (path === "http://localhost:3000/admin/order/home") {
      dispatch(getAllCustomer());
    }
    if (id) {
      dispatch(getAnCustomer(id));
    }
  }, [dispatch, path, id]);
  const handleDeleteCustomer = async (customer) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
        const response = await deleteCustomer(customer?._id);
        if (response.status === 200) {
          if (!customer.successfulDelivery) {
            customer?.clocks?.forEach((item) => {
              updateClock({
                ...item._id,
                quantity: item._id.quantity + item.count,
              });
            });
          }
          dispatch(getAllCustomer());
          setSnack({
            open: true,
            error: false,
            message: "Xóa đơn hàng thành công.",
          });
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Xóa đơn hàng không thành công.",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        error: true,
        message: "Xóa đơn hàng không thành công.",
      });
    }
  };
  const handleConfirm = async (item, type) => {
    try {
      if (item && type === "confirm") {
        const response = await updateCustomer({
          ...item,
          orderConfirmation: true,
        });
        if (response.status === 200) {
          dispatch(getAllCustomer());
          setSnack({
            open: true,
            error: false,
            message: "Xác nhận đơn hàng thành công",
          });
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Xác nhận đơn hàng không thành công",
          });
        }
      } else if (item && type === "complete") {
        const response = await updateCustomer({
          ...item,
          successfulDelivery: true,
        });
        if (response.status === 200) {
          dispatch(getAllCustomer());
          await createStatistics(item);
          setSnack({
            open: true,
            error: false,
            message: "Xác nhận hoàn thành đơn hàng thành công",
          });
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Xác nhận hoàn thành đơn hàng không thành công",
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (type === "confirm") {
        setSnack({
          open: true,
          error: true,
          message: "Xác nhận đơn hàng không thành công",
        });
      } else if (type === "complete") {
        setSnack({
          open: true,
          error: true,
          message: "Xác nhận hoàn thành đơn hàng không thành công",
        });
      }
    }
  };
  switch (key) {
    case "home":
      return (
        <>
          {id ? (
            <AnOrder customer={customer} loadingCustomer={loadingCustomer} />
          ) : (
            <Box className={classes.wrap}>
              <Box className={classes.boxTitle}>
                <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                  Danh sách đơn hàng
                </Typography>
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
                  {loadingCustomer ? (
                    <Box sx={{ width: "100%" }}>
                      <Skeleton variant="rounded" height={100} />
                    </Box>
                  ) : (
                    <Table>
                      <TableHead sx={{ backgroundColor: "#FAFBFE" }}>
                        <TableRow>
                          <TableCell>Stt</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Tên</TableCell>
                          <TableCell align="center">số điện thoại</TableCell>
                          <TableCell align="center">Địa chỉ</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      {customers?.map((item, index) => (
                        <TableBody key={item?._id}>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {index}
                            </TableCell>
                            <TableCell align="center">{item?.email}</TableCell>
                            <TableCell align="center">{item?.name}</TableCell>
                            <TableCell align="center">{item?.phone}</TableCell>
                            <TableCell align="center">
                              {item?.address}
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
                                  onClick={() =>
                                    history.push(
                                      `/admin/order/home/${item?._id}`
                                    )
                                  }
                                >
                                  <FaEye style={{ ...iconCss }} />
                                </Box>
                                {item?.orderConfirmation ? (
                                  item?.successfulDelivery ? (
                                    <Box sx={{ opacity: 0.5 }}>
                                      <Typography
                                        color="initial"
                                        sx={{
                                          fontWeight: "700",
                                          "&:hover": {
                                            cursor: "default",
                                          },
                                        }}
                                      >
                                        Thành công
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Box
                                      className={classes.hover}
                                      onClick={() =>
                                        handleConfirm(item, "complete")
                                      }
                                    >
                                      <Typography
                                        color="initial"
                                        sx={{
                                          fontWeight: "700",
                                          "&:hover": {
                                            cursor: "pointer",
                                          },
                                        }}
                                      >
                                        Hoàn thành
                                      </Typography>
                                    </Box>
                                  )
                                ) : (
                                  <Box
                                    className={classes.hover}
                                    onClick={() =>
                                      handleConfirm(item, "confirm")
                                    }
                                  >
                                    <Typography
                                      color="initial"
                                      sx={{
                                        fontWeight: "700",
                                        "&:hover": {
                                          cursor: "pointer",
                                        },
                                      }}
                                    >
                                      Xác nhận
                                    </Typography>
                                  </Box>
                                )}
                                <Box
                                  className={classes.hover}
                                  onClick={() => handleDeleteCustomer(item)}
                                >
                                  <FaTrash style={{ ...iconCss }} />
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  )}
                </TableContainer>
              </Box>
              <SnackBar snack={snack} setSnack={setSnack} />
            </Box>
          )}
        </>
      );
    default:
      return;
  }
};

export default Order;
