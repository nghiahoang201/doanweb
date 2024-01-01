import React from "react";
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
import { handleValueBrand } from "../../../helpek/handleValue";
import { useState, useEffect } from "react";
import { createBrand, updateBrand } from "../../../store/saga/watchBrandSaga";

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
    },
    error: {
      color: "#f80000",
    },
  })
);

const CUbrand = ({ loadingBrand, setValue, value, keyBrand, setSnack }) => {
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
    setErrorValue(handleValueBrand(value));
  };
  useEffect(() => {
    setErrorValue(handleValueBrand(value));
  }, [value]);
  const handleSubmit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", value.image);
      formData.append("banner", value.banner);
      formData.append("name", value.name);
      formData.append("genres", value.genres);
      formData.append("desc", value.desc);
      e.preventDefault();
      if (keyBrand === "create") {
        if (
          Object.values(value).every((item) => item !== "") &&
          Object.values(errorValue).every((item) => !item)
        ) {
          const response = await createBrand(formData);
          if (response.status === 200) {
            setSnack({
              open: true,
              error: false,
              message: "Thêm thương hiệu thành công.",
            });
          } else {
            setSnack({
              open: true,
              error: true,
              message: "Thêm thương hiệu thất bại.",
            });
          }
        }
      } else if (keyBrand === "update") {
        if (
          Object.values(value).every((item) => item !== "") &&
          Object.values(errorValue).every((item) => !item)
        ) {
          const response = await updateBrand({ brandId: value._id, formData });
          if (response.status === 200) {
            setSnack({
              open: true,
              error: false,
              message: "Cập nhật thương hiệu thành công.",
            });
          } else {
            setSnack({
              open: true,
              error: true,
              message: "Cập nhật thương hiệu thất bại.",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      keyBrand === "create"
        ? setSnack({
            open: true,
            error: true,
            message: "Thêm thương hiệu thất bại.",
          })
        : setSnack({
            open: true,
            error: true,
            message: "Cập nhật thương hiệu thất bại.",
          });
    }
  };
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxTitle}>
        {keyBrand === "create" ? (
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Thêm mới thương hiệu
          </Typography>
        ) : (
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Cập nhật thương hiệu
          </Typography>
        )}
      </Box>
      {loadingBrand ? (
        <Box className={classes.boxList}>
          <Box className={classes.box}>
            <Skeleton variant="rounded" width={100} height={100} />
          </Box>
          <Box className={classes.box} sx={{ width: "100%" }}>
            <Skeleton variant="rounded" height={300} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="text" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="text" height={30} />
          </Box>
          <Box className={classes.box}>
            <Skeleton variant="text" height={30} />
          </Box>
        </Box>
      ) : (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Box className={classes.boxList}>
            <Box className={classes.box}>
              <Typography>Ảnh Brand:</Typography>
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
            <Box className={classes.box}>
              <Typography>Ảnh Banner:</Typography>
              <File
                type={"banner"}
                image={reqImage(value?.banner)}
                handleOnchange={handleOnchange}
              />
              {errorValue?.banner && (
                <Box>
                  <Typography className={classes.error}>
                    {errorValue?.banner}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className={classes.box}>
              <Typography> Tên thương hiệu:</Typography>
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
              <Typography> Giới tính:</Typography>
              <FormControl>
                <Select
                  size="small"
                  name="genres"
                  value={value?.genres || "Nam"}
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
              content={keyBrand === "create" ? "Thêm" : "Cập nhật"}
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

export default CUbrand;
