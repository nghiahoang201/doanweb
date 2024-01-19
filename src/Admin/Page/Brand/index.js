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
import { getAnBrandReq, getBrandReq } from "../../../store/action/brandAction";
import reqImage from "../../../req/reqImage";
import AnBrand from "./AnBrand";
import CUBrand from "./CUBrand";
import SnackBar from "../../../helpek/SnackBar";
import { deleteBrand } from "../../../store/saga/watchBrandSaga";

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

const Brand = () => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const { brands, loadingBrand, brand } = useSelector(
    (state) => state.watchBrandReducer
  );
  const match = useRouteMatch();
  const { key, id } = match.params;
  const iconCss = {
    color: "#000",
    fontSize: "20px",
    cursor: "pointer",
  };

  const initialValue = {
    image: "",
    banner: "",
    name: "",
    genres: "Nam",
    desc: "",
  };
  const [value, setValue] = useState(initialValue);
  const [snack, setSnack] = useState({
    open: false,
    error: false,
    message: "",
  });
  useEffect(() => {
    if (!brands.length) {
      dispatch(getBrandReq());
    }
    if (id) {
      dispatch(getAnBrandReq(id));
    }
    return;
  }, [dispatch, id, brands]);
  useEffect(() => {
    if (Object.keys(brand).length !== 0) {
      setValue(brand);
    }
  }, [brand]);

  const handleDeleteBrand = async (brandId) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
        const response = await deleteBrand(brandId);
        dispatch(getBrandReq());
        if (response.status === 200) {
          setSnack({
            open: true,
            error: false,
            message: "Xóa thương hiệu thành công.",
          });
        } else {
          setSnack({
            open: true,
            error: true,
            message: "Xóa thương hiệu không thành công.",
          });
        }
      }
    } catch (error) {
      setSnack({
        open: true,
        error: true,
        message: "Xóa thương hiệu không thành công.",
      });
    }
  };
  switch (key) {
    case "update":
    case "create":
      return (
        <>
          <CUBrand
            brand={brand}
            loadingBrand={loadingBrand}
            keyBrand={key}
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
            <AnBrand brand={brand} loadingBrand={loadingBrand} />
          ) : (
            <Box className={classes.wrap}>
              <Box className={classes.boxTitle}>
                <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                  Danh sách thương hiệu
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
                  {loadingBrand ? (
                    <Box sx={{ width: "100%" }}>
                      <Skeleton variant="rounded" height={100} />
                    </Box>
                  ) : (
                    <Table>
                      <TableHead sx={{ backgroundColor: "#FAFBFE" }}>
                        <TableRow>
                          <TableCell>Stt</TableCell>
                          <TableCell align="center">Thương hiệu</TableCell>
                          <TableCell align="center">Ảnh</TableCell>
                          <TableCell align="center">Banner</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {brands?.map((item, index) => (
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
                              <img
                                src={reqImage(item?.banner)}
                                alt="img"
                                width={300}
                                height={100}
                              />
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
                                      `/admin/brand/home/${item?._id}`
                                    );
                                  }}
                                >
                                  <FaEye style={{ ...iconCss }} />
                                </Box>
                                <Box
                                  className={classes.hover}
                                  onClick={() => {
                                    history.push(
                                      `/admin/brand/update/${item?._id}`
                                    );
                                  }}
                                >
                                  <FaPencilAlt style={{ ...iconCss }} />
                                </Box>
                                <Box
                                  className={classes.hover}
                                  onClick={() => handleDeleteBrand(item?._id)}
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

export default Brand;
