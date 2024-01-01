import React from "react";
import { Box, Skeleton, TextField, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import File from "../../../helpek/File";
import Buttons from "../../../helpek/Button";
import reqImage from "../../../req/reqImage";
import { handleValueBanner } from "../../../helpek/handleValue";
import { useState, useEffect } from "react";
import {
  createBanner,
  updateBanner,
} from "../../../store/saga/watchBannerSaga";

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

const CUBanner = ({ loadingBanner, setValue, value, keyBanner, setSnack }) => {
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
    setErrorValue(handleValueBanner(value));
  };
  useEffect(() => {
    setErrorValue(handleValueBanner(value));
  }, [value]);
  const handleSubmit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", value.image);
      formData.append("preTitle", value.preTitle);
      formData.append("title", value.title);
      formData.append("desc", value.desc);
      e.preventDefault();
      if (keyBanner === "create") {
        if (
          Object.values(value).every((item) => item !== "") &&
          Object.values(errorValue).every((item) => !item)
        ) {
          const response = await createBanner(formData);
          if (response.status === 200) {
            setSnack({
              open: true,
              error: false,
              message: "Thêm banner thành công.",
            });
          } else {
            setSnack({
              open: true,
              error: true,
              message: "Thêm banner thất bại.",
            });
          }
        }
      } else if (keyBanner === "update") {
        if (
          Object.values(value).every((item) => item !== "") &&
          Object.values(errorValue).every((item) => !item)
        ) {
          const response = await updateBanner({
            bannerId: value._id,
            formData,
          });
          if (response.status === 200) {
            setSnack({
              open: true,
              error: false,
              message: "Cập nhật banner thành công.",
            });
          } else {
            setSnack({
              open: true,
              error: true,
              message: "Cập nhật banner thất bại.",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      keyBanner === "create"
        ? setSnack({
            open: true,
            error: true,
            message: "Thêm banner thất bại.",
          })
        : setSnack({
            open: true,
            error: true,
            message: "Cập nhật banner thất bại.",
          });
    }
  };
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxTitle}>
        {keyBanner === "create" ? (
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Thêm mới Banner
          </Typography>
        ) : (
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Cập nhật Banner
          </Typography>
        )}
      </Box>
      {loadingBanner ? (
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
              <Typography>Ảnh Banner:</Typography>
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
              <Typography> Tiêu đề trên:</Typography>
              <TextField
                fullWidth
                size="small"
                name="preTitle"
                value={value?.preTitle}
                onChange={handleOnchange}
                onBlur={handleOnblur}
              />
              {errorValue?.preTitle && (
                <Box>
                  <Typography className={classes.error}>
                    {errorValue?.preTitle}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className={classes.box}>
              <Typography> Tiêu đề dưới:</Typography>
              <TextField
                fullWidth
                size="small"
                name="title"
                value={value?.title}
                onChange={handleOnchange}
                onBlur={handleOnblur}
              />
              {errorValue?.title && (
                <Box>
                  <Typography className={classes.error}>
                    {errorValue?.title}
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
              content={keyBanner === "create" ? "Thêm" : "Cập nhật"}
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

export default CUBanner;
