import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "react-paginate";
import SingleBlog2Column from "./SingleBlog2Column";
const Blog2ColumnContent = () => {
    // Pagination
    const navigate = useNavigate();
    const { page } = useParams<{ page?: string }>();
    // Get page from URL query
    const currentPageNumber = Number(page) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageNumber);
    const [itemsPerPage] = useState(4);
    useEffect(() => {
        setCurrentPage(currentPageNumber);
    }, [currentPageNumber]);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogData = BlogV1Data.slice(startIndex, endIndex);
    const handlePageClick = (data: any) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
        // Update the URL dynamically
        navigate(`/blog-2-column?page=${selectedPage}`);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 200);
    };
    const totalPages = Math.ceil(BlogV1Data.length / itemsPerPage);
    return (
        <>
            <div className="blog-area blog-grid default-padding">
                <div className="container">
                    <div className="blog-item-box">
                        <div className="row">
                            {currentBlogData.map((blog) => (
                                <div className="col-xl-6 col-md-6 single-item" key={blog.id}>
                                    {/* Inject blogID based on id to match the required type */}
                                    <SingleBlog2Column blog={{ ...blog, blogID: blog.id }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Pagination */}
                    <div className="row">
                        <div className="col-md-12 pagi-area text-center">
                            <Pagination
                                previousLabel={
                                    currentPage === 1 ? (
                                        <i className="fas fa-ban"></i>
                                    ) : (
                                        <i className="fas fa-angle-double-left"></i>
                                    )
                                }
                                nextLabel={
                                    currentPage === totalPages ? (
                                        <i className="fas fa-ban"></i>
                                    ) : (
                                        <i className="fas fa-angle-double-right"></i>
                                    )
                                }
                                breakLabel={"..."}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination text-center"}
                                activeClassName={"active"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousLinkClassName={"page-link"}
                                nextLinkClassName={"page-link"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Blog2ColumnContent;