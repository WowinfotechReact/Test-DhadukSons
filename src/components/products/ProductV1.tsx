import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProductV1Data from "../../assets/jsonData/products/ProductV1Data.json";
import SingleProductCategoryV2 from "./SingleProductCategoryV2";
import {
  GetAllProductsForWeb,
  GetAllProductsForWebResponse,
  Product,
  ProductHome,
  productSize,
  productSizeHome,
} from "../../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../Context/Context";
import Typewriter from "typewriter-effect";

const ProductV1 = () => {
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
      // debugger;
      setLoader(true);
      try {
        const res: GetAllProductsForWebResponse = await GetAllProductsForWeb({
          pageNo,
          pageSize,
        });
        if (res.statusCode === 200) {
          setProducts(res.responseData.data || []);
          // debugger;
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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div
        className="product-style-one-area default-padding bottom-less product-bg"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                className="site-heading text-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h5 className="sub-title">Our Products</h5>
                <h2 className="title">
                  <Typewriter
                    options={{
                      strings: ["Healthy Life With Products"],
                      autoStart: true,
                      loop: true, // set to true if you want it to repeat
                      delay: 75, // typing speed
                      deleteSpeed: 40,
                    }}
                  />
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="vt-products text-center columns-4 justify-content-center">
                {allProductSizes
                  .filter((item) => item.sizeStatus === 1)
                  .map((productSize) => (
                    <SingleProductCategoryV2
                      productSize={productSize}
                      key={productSize.productSizeID}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductV1;
