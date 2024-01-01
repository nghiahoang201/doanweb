import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Box, Skeleton } from "@mui/material";
import Slider from "../../../helpek/Slider";
import Profile from "../../../helpek/Profile";
import Ship from "../../../helpek/Ship";
import Card from "../../../helpek/Card";
import logoStory from "../../../Image/logo1.svg";
import story from "../../../Image/story1.png";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannerReq } from "../../../store/action/bannerAction";
import { getAnClockReq, getClockReq } from "../../../store/action/clockAction";
import { useRouteMatch } from "react-router-dom";
import paths from "../../../paths/paths";
import Clock from "../../../Component/Page/Clock";
import { ValueContext } from "../../Layout";
const useStyle = makeStyles(() =>
  createStyles({
    wrap: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const Home = () => {
  const classes = useStyle();
  const { handleAddProductCart } = useContext(ValueContext);
  const path = window.location.href;
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { key, id } = match.params;
  const { brands } = useSelector((state) => state.watchBrandReducer);
  const { banners, loadingBanner } = useSelector(
    (state) => state.watchBannerReducer
  );
  const { clocks, loading, clock } = useSelector(
    (state) => state.watchClockReducer
  );

  useEffect(() => {
    if (path === "http://localhost:3000/") {
      dispatch(getBannerReq());
      dispatch(getClockReq());
    }
    if (id) {
      dispatch(getAnClockReq(id));
    }
    window.scrollTo(0, 0);
  }, [dispatch, path, id]);

  switch (match.path) {
    case paths.home:
      return (
        <Box className={classes.wrap}>
          <Box sx={{ paddingTop: "80px", width: "100%" }}>
            {loadingBanner ? (
              <Skeleton variant="rounded" width={"100%"} height={"600px"} />
            ) : (
              <Slider banners={banners} />
            )}
          </Box>
          <Ship />
          <Profile content={"MEN'S BEST SELLERS"} buttonLink={true}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_i, index) => (
                    <Skeleton
                      variant="rounded"
                      width={"270px"}
                      height={"410px"}
                      key={index}
                    />
                  ))
              : clocks?.slice(0, 4)?.map(
                  (item) =>
                    item?.genres === "Nam" && (
                      <Box key={item?._id}>
                        <Card
                          clock={item}
                          handleAddProductCart={handleAddProductCart}
                        />
                      </Box>
                    )
                )}
          </Profile>
          <Profile content={"WOMEN'S BEST SELLERS"} buttonLink={true}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_i, index) => (
                    <Skeleton
                      variant="rounded"
                      width={"270px"}
                      height={"410px"}
                      key={index}
                    />
                  ))
              : clocks?.map(
                  (item) =>
                    item?.genres === "Nu" && (
                      <Box key={item?._id}>
                        <Card
                          clock={item}
                          handleAddProductCart={handleAddProductCart}
                        />
                      </Box>
                    )
                )}
          </Profile>
          <Profile
            content2={"THE STORY OF CURNON"}
            buttonLink={false}
            desc={
              "Cuối năm 2016, 3 chàng trai đam mê Startup và Đồng hồ quyết định thành lập Curnon, nhưng ngay từ đầu, chúng tôi đã biết rằng: Curnon sinh ra với một sứ mệnh lớn lao hơn, không chỉ dừng lại là một thương hiệu đồng hồ. Chúng tôi muốn mang tới một nguồn cảm hứng, một sự thay đổi về tư duy, về suy nghĩ và chính những cái chúng tôi gọi là trải nghiệm cho người trẻ."
            }
            image={
              <img src={logoStory} alt="logoStory" width={37} height={37} />
            }
          >
            <Box sx={{ paddingTop: "90px", width: "100%", maxWidth: "1240px" }}>
              <img
                src={story}
                alt="story"
                style={{ width: "100%", maxWidth: "1240px" }}
              />
            </Box>
          </Profile>
        </Box>
      );
    case paths.clockHome:
      return (
        <Clock
          handleAddProductCart={handleAddProductCart}
          keyBrand={key}
          loading={loading}
          clock={clock}
          brands={brands}
          brandId={id}
        />
      );

    default:
      return;
  }
};

export default Home;
