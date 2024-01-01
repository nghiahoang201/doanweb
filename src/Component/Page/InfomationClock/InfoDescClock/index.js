import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { DataInfoDesc, payOnline } from "../../../../mockData";
import { useState } from "react";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      padding: "80px 30px 16px",
    },
    box: {
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
    },
    boxDesc: {
      maxWidth: "1240px",
      width: "100%",
      borderBottom: "1px solid #a6a6a4",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
    },
    info: {
      maxWidth: "1240px",
      width: "100%",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "50px",
      padding: "20px 0",
    },
    ship: {
      maxWidth: "1240px",
      width: "100%",
      margin: "0 auto",
      padding: "20px 0",
    },
    exchange: {
      maxWidth: "1240px",
      width: "100%",
      margin: "0 auto",
      padding: "20px 0",
    },
    pay: {
      maxWidth: "1240px",
      width: "100%",
      margin: "0 auto",
      padding: "20px 0",
    },
    textDesc: {
      opacity: "0.6",
      margin: "14px 0 !important",
    },
    textDescChidlren: {
      opacity: "0.6",
      margin: "14px 0 !important",
      textTransform: "uppercase",
    },
    text: {
      opacity: "0.8",
    },
  })
);

const InfoDescClock = ({ clock }) => {
  const classes = useStyle();
  const [hide, setHide] = useState("info");
  return (
    <Box className={classes.wrap}>
      <Box className={classes.boxDesc}>
        {DataInfoDesc.map((item) => (
          <Box
            key={item?.id}
            sx={{
              padding: "12px",
              cursor: "pointer",
              borderBottom: hide === item?.hide && "1px solid #000000",
            }}
            onClick={() => setHide(item?.hide)}
          >
            <Typography
              sx={{ padding: "10px 20px", textTransform: "uppercase" }}
            >
              {item?.text}
            </Typography>
          </Box>
        ))}
      </Box>
      {hide === "info" && (
        <Box className={classes.info}>
          <Box>
            <Typography sx={{ opacity: 0.6 }}>{clock?.desc}</Typography>
          </Box>
          <Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>
                Kích thước mặt
              </Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.sizeFace}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>Độ dày</Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.thickness}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>Màu mặt</Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.colorFace}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>Loại máy</Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.genresClock}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>Kích cỡ dây</Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.sizeWire}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>Chống nước</Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.Waterproof}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>Mặt kính</Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.faceGlasses}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              sx={{ margin: "unset", borderBottom: "1px solid #d6d6d4" }}
            >
              <Typography className={classes.textDesc}>
                Chất liệu dây
              </Typography>
              <Typography className={classes.textDescChidlren}>
                {clock?.wireMaterial}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {hide === "ship" && (
        <Box className={classes.ship}>
          <Box>
            <Typography sx={{ margin: "14px 0" }}>Phí vận chuyển:</Typography>
            <Box>
              <Typography className={classes.text}>
                -{" "}
                <b style={{ textTransform: "uppercase", opacity: 1 }}>
                  MIỄN PHÍ VẬN CHUYỂN
                </b>{" "}
                với đơn hàng từ 700,000đ trở lên
              </Typography>
              <Typography className={classes.text}>
                -{" "}
                <b style={{ textTransform: "uppercase", opacity: 1 }}>
                  30,000đ
                </b>{" "}
                với đơn hàng có giá trị thấp hơn 700,000đ
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ margin: "14px 0" }}>
              Thời gian vận chuyển:
            </Typography>
            <Box>
              <Typography className={classes.text}>
                - Nội thành Hà Nội: 1-2 ngày
              </Typography>
              <Typography className={classes.text}>
                - Miền Trung: 3-5 ngày
              </Typography>
              <Typography className={classes.text}>
                - Miền Nam: 5-7 ngày
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {hide === "exchange" && (
        <Box className={classes.exchange}>
          <Box>
            <Typography sx={{ margin: "14px 0" }}>
              Chính sách đổi trả:
            </Typography>
            <Box>
              <Typography className={classes.text}>
                -{" "}
                <b style={{ textTransform: "uppercase", opacity: 1 }}>
                  1 ĐỔI 1
                </b>{" "}
                trong vòng 3 ngày kể từ khi nhận hàng (kèm theo các điều kiện)
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ margin: "14px 0" }}>
              Chính sách bảo hành:
            </Typography>
            <Box>
              <Typography className={classes.text}>
                -{" "}
                <b style={{ textTransform: "uppercase", opacity: 1 }}>
                  BẢO HÀNH 10 NĂM
                </b>{" "}
                đối với những lỗi từ nhà sản xuất
              </Typography>
              <Typography className={classes.text}>
                -{" "}
                <b style={{ textTransform: "uppercase", opacity: 1 }}>
                  BẢO HÀNH MIỄN PHÍ (1 lần) trong 1 năm đầu tiên
                </b>{" "}
                với những lỗi người dùng như: vỡ, nứt kính, hấp hơi nước, va đập
                mạnh, rơi linh kiện bên trong mặt đồng hồ...
              </Typography>
              <Typography className={classes.text}>
                -{" "}
                <b style={{ textTransform: "uppercase", opacity: 1 }}>
                  THAY PIN MIỄN PHÍ TRỌN ĐỜI
                </b>{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {hide === "pay" && (
        <Box className={classes.pay}>
          <Typography className={classes.text}>
            Curnon chấp nhận các hình thức thanh toán sau:
          </Typography>
          <Typography
            className={classes.text}
            sx={{ opacity: 1, fontWeight: "700" }}
          >
            Trả tiền mặt khi nhận hàng, Ví điện tử Momo, Ví điện tử VNPay, Trả
            góp theo kỳ hạn qua Fundiin
          </Typography>
          <Box
            className={classes.box}
            sx={{
              flexDirection: "row",
              gap: "10px",
              justifyContent: "start",
              padding: "15px 0",
            }}
          >
            {payOnline.map((item) => (
              <img
                src={item?.imagePay}
                alt="imgPay"
                width={38}
                height={38}
                key={item?.id}
              />
            ))}
          </Box>
          <Typography
            className={classes.text}
            sx={{ opacity: 1, fontWeight: "700" }}
          >
            Số tài khoản: 0047041024767
          </Typography>
          <Typography className={classes.text}>
            Curnon chấp nhận các hình thức thanh toán sau:
          </Typography>
          <Typography className={classes.text}>
            Chủ tài khoản: CTCP Phát triển Sản phẩm Sáng Tạo Việt
          </Typography>
          <Typography className={classes.text}>
            Tên ngân hàng: Bản Việt (Viet Capital)
          </Typography>
          <Typography className={classes.text}>Chi nhánh: Hà Nội</Typography>
        </Box>
      )}
    </Box>
  );
};

export default InfoDescClock;
