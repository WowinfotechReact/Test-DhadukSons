import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ShippingPolicy from "../../components/ShippingPolicy/ShippingPolicy";

const ShippingPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Shipping Policies" breadCrumb="Shipping Policies" />
        <ShippingPolicy />
      </LayoutV1>
    </>
  );
};

export default ShippingPolicyPage;
