import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import OrderDetailsSingleContent from "./OrderDetailsSingleContent";

const OrderDetailsSingle = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.- Cart</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Order Details" breadCrumb="Order-details" />
        <OrderDetailsSingleContent />
      </LayoutV1>
    </>
  );
};

export default OrderDetailsSingle;
