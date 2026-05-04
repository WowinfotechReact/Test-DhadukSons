import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BannerV3 from "../../components/banner/BannerV3";
import AboutV1 from "../../components/about/AboutV1";
import ServiceV1 from "../../components/services/ServiceV1";
import BenefitsV1 from "../../components/benefits/BenefitsV1";
import ProductCategory from "../../components/products/ProductCategory";
import TestimonialV2 from "../../components/testimonials/TestimonialV2";
import GalleryV1 from "../../components/gallery/GalleryV1";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import ContactV1 from "../../components/contact/ContactV1";
import ProductV1 from "../../components/products/ProductV1";
import BlogV1 from "../../components/blog/BlogV1";
import FeatureV1 from "../../components/feature/FeatureV1";
import ProductSpeciality from "../../components/products/ProductSpeciality";
import WhyChooseV4 from "../../components/whyChoose/WhyChooseV4";
import FaqV1 from "../../components/faq/FaqV1";

const Home1 = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP</title>
            </Helmet>

            <LayoutV1>
                <BannerV3 />
                     <ProductSpeciality />
                {/* <FeatureV1 /> */}
                 <WhyChooseV4 />
                    <ProductV1 />
                  {/* <WhyChooseV1 sectionClass="default-padding-bottom" /> */}
               
                 <ProductCategory />
                {/* <ServiceV1 hasTitle={true} /> */}
                <BenefitsV1 />
            
                 <ServiceV1 hasTitle={true} />
                  <TestimonialV2 />
              
              
                <ContactV1 />
                <FaqV1 sectionClass="bg-gray" />
            </LayoutV1>
        </>
    );
};

export default Home1;