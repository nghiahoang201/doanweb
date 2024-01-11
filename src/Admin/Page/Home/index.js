import React, { useCallback, useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { FaChartBar } from "react-icons/fa";
import CollectData from "../../../helpek/chart";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatistics } from "../../../store/action/statistics";
import Calendar from "../../../helpek/Calendar";
import { FcPlanner } from "react-icons/fc";

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
    boxStatistics: {
      paddingTop: "5px",
    },
    chip: {
      background: "#e8f5e9",
      fontSize: "16px",
      fontWeight: "600",
    },
    calendar: {
      width: "256px",
      margin: "20px",
      position: "relative",
    },
  })
);

const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { statisticss } = useSelector((state) => state.watchStatisticsReducer);
  const [hideCalendar, setHideCalendar] = useState(false);
  const [statisticsMonth, setStatisticsMonth] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const path = window.location.href;
  const getDay = (type) => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    if (type === "DMY") {
      return `${day}-${month}-${year}`;
    } else if (type === "MY") {
      return `${month}-${year}`;
    }
  };
  useEffect(() => {
    if (path === "http://localhost:3000/admin") {
      dispatch(getAllStatistics());
    }
  }, [path, dispatch]);

  const OrderIn = useCallback(
    (type) => {
      if (type === "day") {
        if (selectDate) {
          return statisticss.find((item) => item?.dayDate === selectDate);
        } else {
          return statisticss.find((item) => item?.dayDate === getDay("DMY"));
        }
      } else if (type === "month") {
        if (selectDate) {
          return statisticss.filter(
            (item) => item?.dayDate.slice(3) === selectDate.slice(3)
          );
        } else {
          return statisticss.filter(
            (item) => item?.dayDate.slice(3) === getDay("MY")
          );
        }
      }
    },
    [statisticss, selectDate]
  );
  useEffect(() => {
    setStatisticsMonth(OrderIn("month"));
  }, [OrderIn]);

  const quntityOrderInMonth = OrderIn("month").reduce(
    (quantity, order) => quantity + order?.quantity,
    0
  );

  const totalPriceInMonth = OrderIn("month")
    .reduce((price, item) => price + item?.totalPrice, 0)
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
              label={(OrderIn("day")?.totalPrice
                ? OrderIn("day")?.totalPrice
                : 0
              )?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
              className={classes.chip}
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
              label={OrderIn("day")?.quantity ? OrderIn("day")?.quantity : 0}
              className={classes.chip}
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
            <Chip label={totalPriceInMonth} className={classes.chip} />
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
            <Chip label={quntityOrderInMonth} className={classes.chip} />
          </Box>
        </Box>
      </Box>

      <Box className={classes.boxStatistics}>
        <Box
          sx={{
            padding: "5px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "16px" }}>
            Thống kê thu nhập trong tháng
          </Typography>
          <Box className={classes.calendar}>
            <FcPlanner
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => setHideCalendar(!hideCalendar)}
            />
            {hideCalendar && <Calendar setSelectDate={setSelectDate} />}
          </Box>
        </Box>
        <CollectData statisticsMonth={statisticsMonth} />
      </Box>
    </Box>
  );
};

export default Home;
