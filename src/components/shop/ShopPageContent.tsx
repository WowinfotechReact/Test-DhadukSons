import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "react-paginate";
import { useLoader } from "../../Context/Context";

import {
  Product,
  GetAllProductsForWebResponse,
  GetAllProductsForWeb,
  ProductHome,
  productSizeHome,
} from "../../services/ProductService";

import SingleProductCategoryV2 from "../products/SingleProductCategoryV2";
import SingleProductList from "./SingleProductList";

const ShopPageContent = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();

  const currentPageNumber = Number(page) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [itemsPerPage] = useState(8);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(5);

  const [products, setProducts] = useState<ProductHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProductSizes, setAllProductSizes] = useState<productSizeHome[]>([]);

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

          const filteredList = sizesWithImage.filter(
            (item) => item.sizeStatus === 1
          );

          setAllProductSizes(filteredList);
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
    <div className="validtheme-shop-area default-padding">
      <div className="container">
        {/* header */}
        <div className="shop-listing-contentes">
          <div className="row item-flex center">
            <div className="col-lg-7">
              <div className="content">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button
                                            className="nav-link active"
                                            id="grid-tab-control"
                                            data-bs-toggle="tab"
                                            data-bs-target="#grid-tab"
                                            type="button"
                                            role="tab"
                                            aria-controls="grid-tab"
                                            aria-selected="true"
                                        >
                                            <i className="fas fa-th-large" />
                                        </button> */}
                    {/* <button
                                            className="nav-link"
                                            id="list-tab-control"
                                            data-bs-toggle="tab"
                                            data-bs-target="#list-tab"
                                            type="button"
                                            role="tab"
                                            aria-controls="list-tab"
                                            aria-selected="false"
                                        >
                                            <i className="fas fa-th-list" />
                                        </button> */}
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-lg-5 text-right">
              {/* <p>
                Showing {products.length > 0 ? startIndex + 1 : 0}–
                {Math.min(endIndex, products.length)} of {products.length}{" "}
                results
              </p> */}
              {/* <select>
                                <option value="latest">Short by latest</option>
                                <option value="recent">Short by Recent</option>
                                <option value="popular">Short by Popular</option>
                                <option value="relevant">Short by Relevant</option>
                            </select> */}
            </div>
          </div>
        </div>

        {/* product listing */}
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              <div
                className="tab-content tab-content-info text-center"
                id="shop-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="grid-tab"
                  role="tabpanel"
                  aria-labelledby="grid-tab-control"
                >
                  <ul className="vt-products columns-4">
                    {allProductSizes.map((product) => (
                      <SingleProductCategoryV2
                        productSize={product}
                        key={product.productKeyID}
                      />
                    ))}
                  </ul>
                </div>

                {/* <div
                                    className="tab-pane fade"
                                    id="list-tab"
                                    role="tabpanel"
                                    aria-labelledby="list-tab-control"
                                >
                                    <ul className="vt-products colums-2">
                                        {currentProductData.map((product) => (
                                            <SingleProductList
                                                product={product}
                                                key={product.productKeyID}
                                            />
                                        ))}
                                    </ul>
                                </div> */}
              </div>

              {/* pagination */}
              {totalPages !== 1 && (
                <nav className="woocommerce-pagination">
                  <Pagination
                    previousLabel={
                      currentPage === 1 ? (
                        <i className="fas fa-ban"></i>
                      ) : (
                        <i className="fas fa-angle-left"></i>
                      )
                    }
                    nextLabel={
                      currentPage === totalPages ? (
                        <i className="fas fa-ban"></i>
                      ) : (
                        <i className="fas fa-angle-right"></i>
                      )
                    }
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={" page-numbers text-center"}
                    activeClassName={"current"}
                    pageLinkClassName={"page-numbers"}
                    previousLinkClassName={"page-numbers"}
                    nextLinkClassName={"page-numbers"}
                  />
                </nav>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPageContent;
