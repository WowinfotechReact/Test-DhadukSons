import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import BannerV2Data from "../../assets/jsonData/banner/BannerV2Data.json";
import SingleBannerV2 from "./SingleBannerV2";
import { useEffect, useState } from "react";
import { GetAllBannersWeb } from "../../APIServices/BannerAPI/BannerAPI";

export interface Banner {
  bannerKeyID?: string;
  bannerTitle?: string;
  bannerSubTitle?: string;
  bannerImage?: string;
  status?: string;
}

const BannerV2 = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([]);

  useEffect(() => {
    GetAllBannerListWeb(1, 15);
  }, []);

  const GetAllBannerListWeb = async (pageNo: number, pageSize: number) => {
    // debugger;
    try {
      const res = await GetAllBannersWeb({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        const bannerData = res.responseData?.data;
        const filteredBanners = bannerData.filter(
          (item: any) => item.status === "Active"
        );
        setBannerList(filteredBanners);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="banner-area banner-style-two text-center navigation-circle zoom-effect overflow-hidden text-light">
        <Swiper
          key={bannerList.length} // <-- Force re-render when data changes
          className="banner-fade"
          direction={"horizontal"}
          loop={true}
          effect={"fade"}
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // Navigation arrows
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Navigation, Autoplay, EffectFade]}
        >
          {/* BannerV2Data */}
          {bannerList.map((banner) => (
            <SwiperSlide key={banner.bannerKeyID}>
              <SingleBannerV2 banner={banner} />
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </Swiper>
      </div>
    </>
  );
};

export default BannerV2;
