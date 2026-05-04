import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ReturnRefundPolicy from "../../components/ReturnAndRefund/ReturnAndRefund";

const ReturnRefundPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Return Policy" breadCrumb="Return-Policy" />
        <ReturnRefundPolicy />
      </LayoutV1>
    </>
  );
};

export default ReturnRefundPolicyPage;
