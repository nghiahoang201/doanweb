import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import File from "../../../helpek/File";
import Buttons from "../../../helpek/Button";
import reqImage from "../../../req/reqImage";
import { handleValueClock } from "../../../helpek/handleValue";
import { useState } from "react";
import { createClock, updateClock } from "../../../store/saga/watchClockSaga";

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
    box: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "25px",
      gap: "10px",
      width: "100%",
    },
    flexBox: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    error: {
      color: "#f80000",
      fontWeight: "600",
    },
  })
);

const CUClock = ({ brands, loading, setValue, value, keyClock, setSnack }) => {
  const classes = useStyle();
  const [errorValue, setErrorValue] = useState();
  const handleOnchange = (e) => {
    try {
      if (e.target.name === "image" || e.target.name === "banner") {
        setValue({ ...value, [e.target.name]: e.target.files[0] });
      } else {
        setValue({ ...value, [e.target.name]: e.target.value });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnblur = () => {
    setErrorValue(handleValueClock(value));
  };
  useEffect(() => {
    setErrorValue(handleValueClock(value));
  }, [value]);
  const handleSubmit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", value.image);
      formData.append("name", value.name);
      formData.append("brand", value.brand);
      formData.append("price", value.price);
      formData.append("sizeFace", value.sizeFace);
      formData.append("colorFace", value.colorFace);
      formData.append("thickness", value.thickness);
      formData.append("sizeWire", value.sizeWire);
      formData.append("genres", value.genres);
      formData.append("Waterproof", value.Waterproof);
      formData.append("faceGlasses", value.faceGlasses);
      formData.append("wireMaterial", value.wireMaterial);
      formData.append("genresClock", value.genresClock);
      formData.append("sell", value.sell);
      formData.append("quantity", value.quantity);
      formData.append("desc", value.desc);
      e.preventDefault();
      if (keyClock === "create") {
        if (
          Object.values(value).every(
            (item) => item !== "sell" && item !== null
          ) &&
          Object.values(errorValue).every((item) => !item)
        ) {
          const response = await createClock(formData);
          if (response.status === 200) {
            setSnack({
              open: true,
              error: false,
              message: "Thêm sản phẩm thành công.",
            });
          } else {
            setSnack({
              open: true,
              error: true,
              message: "Thêm sản phẩm thất bại.",
            });
          }
        }
      } else if (keyClock === "update") {
        if (
          Object.values(value).every((item) => item !== null) &&
          Object.values(errorValue).every((item) => !item)
        ) {
          const response = await updateClock({ clockId: value._id, formData });
          if (response.status === 200) {
            setSnack({
              open: true,
              error: false,
              message: "Cập nhật sản phẩm thành công.",
            });
          } else {
            setSnack({
              open: true,
              error: true,
              message: "Cập nhật sản phẩm thất bại.",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      keyClock === "create"
        ? setSnack({
            open: true,
            error: true,
            message: "Thêm sản phẩm thất bại.",
          })
        : setSnack({
            open: true,
            error: true,
            message: "Cập nhật sản phẩm thất bại.",
          });
    }
  };
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxTitle}>
        {keyClock === "create" ? (
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Thêm mới sản phẩm
          </Typography>
        ) : (
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Cập nhật sản phẩm
          </Typography>
        )}
      </Box>
      {loading ? (
        <Box className={classes.boxList}>
          <Box className={classes.box}>
            <Skeleton variant="rounded" width={100} height={100} />
          </Box>
          <Box className={classes.box} sx={{ width: "100%" }}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="rounded" height={30} />
          </Box>
        </Box>
      ) : (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Box className={classes.boxList}>
            <Box className={classes.box}>
              <Typography>Ảnh đồng hồ:</Typography>
              <File
                type={"image"}
                image={reqImage(value?.image)}
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
            <Box className={classes.flexBox}>
              <Box className={classes.box}>
                <Typography> Tên đồng hồ:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  value={value?.name}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
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
                <Typography> Thương hiệu:</Typography>
                <FormControl>
                  <Select
                    size="small"
                    name="brand"
                    value={value?.brand}
                    onChange={handleOnchange}
                  >
                    {brands?.map((item, index) => (
                      <MenuItem value={item?._id} key={index}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errorValue?.brand && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.brand}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={classes.flexBox}>
              <Box className={classes.box}>
                <Typography> {`Giá (VNĐ):`}</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="price"
                  value={value?.price}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.price && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.price}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Kích thước mặt:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="sizeFace"
                  value={value?.sizeFace}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.sizeFace && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.sizeFace}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={classes.flexBox}>
              <Box className={classes.box}>
                <Typography> Độ dày:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="thickness"
                  value={value?.thickness}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.thickness && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.thickness}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography>Màu mặt:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="colorFace"
                  value={value?.colorFace}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.colorFace && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.colorFace}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={classes.flexBox}>
              <Box className={classes.box}>
                <Typography> Loại máy:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="genresClock"
                  value={value?.genresClock}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.genresClock && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.genresClock}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Kích cỡ dây:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="sizeWire"
                  value={value?.sizeWire}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.sizeWire && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.sizeWire}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={classes.flexBox}>
              <Box className={classes.box}>
                <Typography> Chống nước:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="Waterproof"
                  value={value?.Waterproof}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.Waterproof && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.Waterproof}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.box}>
                <Typography> Mặt kính</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="faceGlasses"
                  value={value?.faceGlasses}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.faceGlasses && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.faceGlasses}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={classes.flexBox}>
              <Box className={classes.box}>
                <Typography> Giới tính:</Typography>

                <FormControl>
                  <Select
                    size="small"
                    name="genres"
                    value={value?.genres}
                    onChange={handleOnchange}
                  >
                    <MenuItem value={"Nam"}>Nam</MenuItem>
                    <MenuItem value={"Nu"}>Nu</MenuItem>
                  </Select>
                </FormControl>

                {errorValue?.genres && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.genres}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box className={classes.box}>
                <Typography> Chất liệu dây:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="wireMaterial"
                  value={value?.wireMaterial}
                  onChange={handleOnchange}
                  onBlur={handleOnblur}
                />
                {errorValue?.wireMaterial && (
                  <Box>
                    <Typography className={classes.error}>
                      {errorValue?.wireMaterial}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box className={classes.box}>
              <Typography>{"giảm giá (%):"}</Typography>
              <TextField
                fullWidth
                size="small"
                name="sell"
                value={value?.sell}
                onChange={handleOnchange}
                onBlur={handleOnblur}
              />
              {errorValue?.sell && (
                <Box>
                  <Typography className={classes.error}>
                    {errorValue?.sell}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className={classes.box}>
              <Typography> Số lượng:</Typography>
              <TextField
                fullWidth
                size="small"
                name="quantity"
                value={value?.quantity}
                onChange={handleOnchange}
                onBlur={handleOnblur}
              />
              {errorValue?.quantity && (
                <Box>
                  <Typography className={classes.error}>
                    {errorValue?.quantity}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className={classes.box}>
              <Typography> Chi tiết:</Typography>
              <TextField
                fullWidth
                size="small"
                name="desc"
                multiline
                minRows={4}
                value={value?.desc}
                onChange={handleOnchange}
                onBlur={handleOnblur}
              />
              {errorValue?.desc && (
                <Box>
                  <Typography className={classes.error}>
                    {errorValue?.desc}
                  </Typography>
                </Box>
              )}
            </Box>

            <Buttons
              type={"submit"}
              content={keyClock === "create" ? "Thêm" : "Cập nhật"}
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
          </Box>
        </form>
      )}
    </Box>
  );
};

export default CUClock;
