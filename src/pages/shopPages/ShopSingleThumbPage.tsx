import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ShopSingleThumbContent from "../../components/shop/ShopSingleThumbContent";
import { useParams } from "react-router-dom";
import ProductV1Data from "../../assets/jsonData/products/ProductV1Data.json"
import { Helmet } from "react-helmet-async";

const ShopSingleThumbPage = () => {

    const { id } = useParams();
    const data = ProductV1Data.find(product => product.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Shop Single Thumb</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Grilled Flank Steak" breadCrumb="shop-single-thumb" />
                {data && <ShopSingleThumbContent productInfo={data} />}
            </LayoutV1>
        </>
    );
};

export default ShopSingleThumbPage;