import BannerV3Data from "../../assets/jsonData/banner/BannerV3Data.json";
import SingleBannerV3 from "./SingleBannerV3";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { GetAllBannersWeb } from "../../APIServices/BannerAPI/BannerAPI";
import { useLoader } from "../../Context/Context";
import { useEffect, useState } from "react";

export interface DataType {
  bannerKeyID: number;
  heading: string;
  imageUrl?: string;
  bannerTitle: string;
  bannerImage: string;
}
interface Banner {
  id?: number;
  bannerImage?: string;
  bannerSubTitle?: string;
  bannerTitle: string;
  buttonText?: string;
  status?: "Active" | "InActive";
}

const BannerV3 = () => {
  const { setLoader } = useLoader();
  const [bannersData, setBannersData] = useState<DataType[]>([]);

  useEffect(() => {
    GetAllBannersWebData(1, 15, null);
  }, []);

  const GetAllBannersWebData = async (
    pageNo: number,
    pageSize: number,
    searchKeyword: string | null,
  ) => {
    setLoader(true);
    try {
      const res = await GetAllBannersWeb({
        pageNo,
        pageSize,
        searchKeyWord: searchKeyword ?? null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        const data: Banner[] = res.responseData?.data || [];

        // 1️⃣ Filter inactive
        const filteredData = data.filter((item) => item.status !== "InActive");

        // 2️⃣ Map API → UI model
        const mappedData: DataType[] = filteredData.map((item) => ({
          bannerKeyID: item.id ?? 0, // API id → UI key
          heading: item.bannerSubTitle ?? "", // map heading
          bannerTitle: item.bannerTitle,
          bannerSubTitle: item.bannerSubTitle,
          bannerImage: item.bannerImage ?? "",
          imageUrl: item.bannerImage ?? "",
        }));

        // 3️⃣ Set correct type
        setBannersData(mappedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="banner-area navigation-circle text-light banner-style-three zoom-effect overflow-hidden">
        <Swiper
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
          pagination={{
            el: ".banner-pagination",
            type: "bullets",
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Pagination, Autoplay, Keyboard, EffectFade]}
        >
          {bannersData.map((banner) => (
            <SwiperSlide key={banner.bannerKeyID}>
              <SingleBannerV3 banner={banner} />
            </SwiperSlide>
          ))}
          {/* Navigation */}
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </Swiper>
      </div>
    </>
  );
};

export default BannerV3;
