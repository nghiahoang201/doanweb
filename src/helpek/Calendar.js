import React, { useState } from "react";
import dayjs from "dayjs";
import { makeStyles, createStyles } from "@mui/styles";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { range } from "d3";
import { Box, Typography } from "@mui/material";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      position: "absolute",
      top: "30px",
      width: "256px",
      border: "1px solid #d5d4d3",
      borderRadius: "4px",
      backgroundColor: "#fff",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#86efac",
      padding: "8px",
    },
    boxToal: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "8px",
    },
    text: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "1.5px",
    },
    button: {
      fontSize: "18px",
      cursor: "pointer",
    },
    chip: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "4px",
      textAlign: "center",
      margin: "8px",
      backgroundColor: "#fff",
    },
    day: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "700",
      cursor: "pointer",
      borderRadius: "100%",
      width: "28px",
      height: "28px",
      "&:hover": {
        backgroundColor: "#cbd5e1",
      },
    },
  })
);

const Calendar = ({ setSelectDate }) => {
  const classes = useStyle();
  const [dayjsObj, setDayjsObj] = useState(dayjs());

  const month = dayjsObj.month();
  const year = dayjsObj.year();
  const daysInMonth = dayjsObj.daysInMonth();
  const dayInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = dayjs();

  const handlePrev = () => {
    setDayjsObj(dayjsObj.subtract(1, "month"));
  };

  const handleNext = () => {
    setDayjsObj(dayjsObj.add(1, "month"));
  };
  const handleDateClick = (day) => {
    // Xử lý khi click vào một ngày
    const newSelectedDate = dayjsObj.set("date", day);
    setDayjsObj(newSelectedDate);
    setSelectDate(newSelectedDate.format("DD-MM-YYYY"));
  };
  return (
    <Box className={classes.wrap}>
      <Box className={classes.box}>
        <AiOutlineCaretLeft className={classes.button} onClick={handlePrev} />
        <Typography sx={{ margin: "0 8px" }}>
          {" "}
          {dayjsObj.format("DD-MM-YYYY")}
        </Typography>
        <AiOutlineCaretRight className={classes.button} onClick={handleNext} />
      </Box>
      <Box className={classes.boxToal}>
        {dayInWeek.map((item, index) => (
          <Typography key={index} className={classes.text}>
            {item}
          </Typography>
        ))}
      </Box>
      <Box className={classes.chip}>
        {range(daysInMonth).map((i) => (
          <Typography
            key={i}
            className={classes.day}
            onClick={() => handleDateClick(i + 1)}
            sx={{
              backgroundColor:
                i + 1 === today.date() &&
                month === today.month() &&
                year === today.year()
                  ? "#cbd5e1"
                  : "",
            }}
          >
            {i + 1}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
