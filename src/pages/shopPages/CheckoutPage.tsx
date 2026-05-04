import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import CheckoutContent from "../../components/cart/CheckoutContent";
import LayoutV1 from "../../components/layouts/LayoutV1";

const CheckoutPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Checkout</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Checkout" breadCrumb="Checkout" />
                <CheckoutContent />
            </LayoutV1>
        </>
    );
};

export default CheckoutPage;