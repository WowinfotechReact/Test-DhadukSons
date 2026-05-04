import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import WishListPageContent from "../../components/shop/WishListPageContent";

const WishListPage = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.- Shop</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Products" breadCrumb="Products" />
        <WishListPageContent />
      </LayoutV1>
    </>
  );
};

export default WishListPage;
