import React, { useEffect } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { FaChartBar } from "react-icons/fa";
import CollectData from "../../../helpek/chart";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatistics } from "../../../store/action/statistics";
import { DMY, formatTimeIso } from "../../../helpek/formatTime";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      padding: "20px",
    },
    box: {
      display: "flex",
      gap: "20px",
    },
    boxToal: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignContent: "center",
      padding: "30px",
      border: "1px solid rgba(0, 0, 0, 0.0625)",
      borderRadius: "4px",
      width: "100%",
    },
  })
);

const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { statisticss } = useSelector((state) => state.watchStatisticsReducer);

  const path = window.location.href;
  useEffect(() => {
    if (path === "http://localhost:3000/admin") {
      dispatch(getAllStatistics());
    }
  }, [path, dispatch]);

  useEffect(() => {
    if (statisticss) {
      CollectData(statisticss);
    }
  }, [statisticss]);

  const totalPriceMoth = statisticss
    ?.reduce((price, item) => price + item?.totalPrice, 0)
    ?.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const oderInDay = statisticss.filter(
    (item) => formatTimeIso(item?.createdAt, DMY) === `${day}-${month}-${year} `
  );

  const totalPriceDay = oderInDay
    ?.reduce((price, item) => price + item?.totalPrice, 0)
    ?.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });

  return (
    <Box className={classes.wrap}>
      <Box className={classes.box}>
        <Box className={classes.boxToal}>
          <Box>
            <Typography>Tổng thu nhập trong ngày</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FaChartBar style={{ fontSize: "30px", color: "#4caf50" }} />
            <Chip
              label={totalPriceDay}
              sx={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}
            />
          </Box>
        </Box>
        <Box className={classes.boxToal}>
          <Box>
            <Typography>Tổng đơn hàng trong ngày</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FaChartBar style={{ fontSize: "30px", color: "#4caf50" }} />
            <Chip
              label={oderInDay?.length}
              sx={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}
            />
          </Box>
        </Box>

        <Box className={classes.boxToal}>
          <Box>
            <Typography>Tổng thu nhập trong tháng</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FaChartBar style={{ fontSize: "30px", color: "#4caf50" }} />
            <Chip
              label={totalPriceMoth}
              sx={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}
            />
          </Box>
        </Box>
        <Box className={classes.boxToal}>
          <Box>
            <Typography>Tổng đơn hàng trong tháng</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FaChartBar style={{ fontSize: "30px", color: "#4caf50" }} />
            <Chip
              label={statisticss?.length}
              sx={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box id="collect-chart" style={{ padding: "40px" }}></Box>
      </Box>
    </Box>
  );
};

export default Home;
