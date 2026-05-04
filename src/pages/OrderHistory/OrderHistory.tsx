import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import OrderHistoryContent from "./OrderHistoryContent";

const OrderHistory = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.- Shop</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="My Orders" breadCrumb="My Orders" />
        <OrderHistoryContent />
      </LayoutV1>
    </>
  );
};

export default OrderHistory;
