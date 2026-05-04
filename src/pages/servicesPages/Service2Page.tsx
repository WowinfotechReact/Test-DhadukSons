import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import FaqV1 from "../../components/faq/FaqV1";
import FeatureV3 from "../../components/feature/FeatureV3";
import LayoutV1 from "../../components/layouts/LayoutV1";
import Partner from "../../components/partner/Partner";
import ServiceV2 from "../../components/services/ServiceV2";
import TestimonialV2 from "../../components/testimonials/TestimonialV2";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";

const Service2Page = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Profile" breadCrumb="Profile" />
                <FeatureV3 sectionClass="default-padding-top bg-gray" />

            </LayoutV1>
        </>
    );
};

export default Service2Page;