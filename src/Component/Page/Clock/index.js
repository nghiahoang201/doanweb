import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import Card from "../../../helpek/Card";
import reqImage from "../../../req/reqImage";
import InfomationClock from "../InfomationClock";

const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      paddingTop: "80px",
    },
    slider: {
      width: "100%",
      padding: "30px 30px 0",
    },
    boxContent: {
      margin: "52px 140px 0",
    },
    boxDesc: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      padding: "16px 0 36px",
      gap: "40px",
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "60px 24px",
      flexWrap: "wrap",
    },
  })
);

const Clock = ({
  handleAddProductCart,
  keyBrand,
  loading,
  clock,
  brands,
  brandId,
}) => {
  const classes = useStyle();

  return (
    <Box className={classes.wrap}>
      {brandId ? (
        <InfomationClock
          handleAddProductCart={handleAddProductCart}
          clock={clock}
          loading={loading}
          keyBrand={keyBrand}
        />
      ) : (
        brands?.map(
          (item) =>
            item?.name === keyBrand && (
              <Box key={item?._id}>
                <Box className={classes.slider}>
                  <img
                    src={reqImage(item?.banner)}
                    alt="sloder"
                    width={"100%"}
                    height={396}
                  />
                </Box>
                <Box className={classes.boxContent}>
                  <Box sx={{ textAlign: "start" }}>
                    <Typography sx={{ fontSize: "32px", fontWeight: 300 }}>
                      {item?.name}
                    </Typography>
                  </Box>
                  <Box className={classes.boxDesc}>
                    <Typography
                      sx={{
                        lineHeight: "24px",
                        letterSpacing: ".02rem",
                        opacity: 0.6,
                      }}
                    >
                      {item?.desc}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "end",
                        lineHeight: "24px",
                        letterSpacing: ".02rem",
                        opacity: 0.8,
                        fontStyle: "italic",
                      }}
                    >
                      {item?.clocks?.length} trên {item?.clocks?.length} sản
                      phẩm
                    </Typography>
                  </Box>
                  <Box className={classes.box} sx={{ paddingTop: "70px" }}>
                    <Box className={classes.box} sx={{ width: "1240px" }}>
                      {item?.clocks?.map((clock) => (
                        <Box key={clock?._id}>
                          <Card
                            clock={clock}
                            handleAddProductCart={handleAddProductCart}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
        )
      )}
    </Box>
  );
};

export default Clock;
