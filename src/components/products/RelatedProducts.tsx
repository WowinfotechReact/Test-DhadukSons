import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay } from "swiper/modules";
import ProductV1Data from "../../assets/jsonData/products/ProductV1Data.json";
import SingleProductCategoryV2 from "./SingleProductCategoryV2";
import {
  GetAllProductsForWeb,
  GetAllProductsForWebResponse,
  Product,
  ProductHome,
  productSizeHome,
} from "../../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoader } from "../../Context/Context";

const RelatedProducts = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();

  const currentPageNumber = Number(page) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [itemsPerPage] = useState(8);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(5);

  const [products, setProducts] = useState<ProductHome[]>([]);
  const [allProductSizes, setAllProductSizes] = useState<productSizeHome[]>([]);
  const [loading, setLoading] = useState(true);

  const { setLoader } = useLoader();

  useEffect(() => {
    setCurrentPage(currentPageNumber);
  }, [currentPageNumber]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(true);
      try {
        const res: GetAllProductsForWebResponse = await GetAllProductsForWeb({
          pageNo,
          pageSize,
        });
        if (res.statusCode === 200) {
          setProducts(res.responseData.data || []);

          // Flatten all productSizes into a single array and include parent image
          const sizesWithImage = (res.responseData.data || []).flatMap(
            (product: ProductHome) =>
              product.productSizes.map((size) => ({
                ...size,
                imageUrl: product.imageUrl, // add parent image here
                productTitle: product.productTitle,
                slug: product.slug,
              }))
          );

          setAllProductSizes(sizesWithImage);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoader(false);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [pageNo, pageSize]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProductData = products.slice(startIndex, endIndex);
  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    setPageNo(selectedPage);
    navigate(`/products?page=${selectedPage}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <div className="related-products carousel-shadow">
        <div className="row">
          <div className="col-md-12">
            <h3>Related Products</h3>
            <Swiper
              loop={true}
              slidesPerView={1}
              spaceBetween={30}
              autoplay={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 4,
                },
              }}
              className="vt-products text-center related-product-carousel"
              modules={[Keyboard, Autoplay]}
            >
              <div className="swiper-wrapper">
                {allProductSizes
                  .filter((item) => item.sizeStatus === 1)
                  .map((product) => (
                    <SwiperSlide key={product.productKeyID}>
                      <SingleProductCategoryV2
                        productSize={product}
                        key={product.productKeyID}
                      />
                    </SwiperSlide>
                  ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
