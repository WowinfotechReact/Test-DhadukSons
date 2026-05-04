import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ShopSingleContent from "../../components/shop/ShopSingleContent";
import { Helmet } from "react-helmet-async";
import {
  GetProductDetailsForWeb,
  Product,
} from "../../services/ProductService";
interface ProductResponse {
  data: Product;

}
const ShopSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await GetProductDetailsForWeb(id);
        if ("responseData" in res) {
          setProduct(res.responseData);
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP - Product Details</title>

        <script>
          {`
      if (window.fbq && ${!!product?.data}) {
        fbq('track', 'ViewContent', {
          content_ids: ['${product?.data?.productID}'],
          content_name: '${product?.data?.productTitle}',
          content_type: 'product',
          value: ${product?.data?.productSizes?.[0]?.productPrice || 0},
          currency: 'INR'
        });
      }
    `}
        </script>
      </Helmet>

      <LayoutV1>
        {/* <BreadCrumb title="Product Details" breadCrumb="Product Details" /> */}
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <ShopSingleContent productInfo={product} productID={id} />
        ) : (
          <p>Product not found</p>
        )}
      </LayoutV1>
    </>
  );
};

export default ShopSinglePage;
