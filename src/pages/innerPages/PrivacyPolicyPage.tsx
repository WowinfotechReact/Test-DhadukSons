import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Privacy Policy" breadCrumb="Privacy-Policy" />
        <PrivacyPolicy />
      </LayoutV1>
    </>
  );
};

export default PrivacyPolicyPage;
