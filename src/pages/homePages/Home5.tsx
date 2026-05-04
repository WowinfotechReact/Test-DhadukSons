import { Helmet } from "react-helmet-async";
import BannerV2 from "../../components/banner/BannerV2";
// import BlogV1 from "../../components/blog/BlogV1";
// import CallToAction from "../../components/cta/CallToAction";
import FaqV1 from "../../components/faq/FaqV1";
import ProductV1 from "../../components/products/ProductV1";
import FeatureV1 from "../../components/feature/FeatureV1";
// import GalleryV2 from "../../components/gallery/GalleryV2";
import LayoutV2 from "../../components/layouts/LayoutV2";
import ContactV1 from "../../components/contact/ContactV1";
import BenefitsV1 from "../../components/benefits/BenefitsV1";
import Partner from "../../components/partner/Partner";
import History from "../../components/history/History";
import WhyChooseV2 from "../../components/whyChoose/WhyChooseV2";
import TestimonialV2 from "../../components/testimonials/TestimonialV2";
import ServiceV1 from "../../components/services/ServiceV1";
import BannerV3 from "../../components/banner/BannerV3";
import ProductSpeciality from "../../components/products/ProductSpeciality";
import WhyChooseV4 from "../../components/whyChoose/WhyChooseV4";
import ProductCategory from "../../components/products/ProductCategory";
const Home5 = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP</title>
      </Helmet>

      <LayoutV2>
        <BannerV3 />
        <ProductSpeciality />
        <WhyChooseV4 />
        {/* <BannerV2 /> */}
        {/* <FeatureV1 /> */}
        <ProductV1 />
        <ProductCategory />
        {/* <History /> */}
        <BenefitsV1 />
        <ServiceV1 hasTitle={true} />
        <TestimonialV2 />
        <WhyChooseV2 />

        <ContactV1 />

        <FaqV1 sectionClass="bg-gray" />
        {/* <Partner /> */}
        {/* <CallToAction /> */}
        {/* <BlogV1 /> */}
      </LayoutV2>
    </>
  );
};

export default Home5;
