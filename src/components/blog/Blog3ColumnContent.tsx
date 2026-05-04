import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "react-paginate";
import SingleBlog2Column from "./SingleBlog2Column";
import { GetAllBlogs, GetAllBlogsWeb } from "../../APIServices/BlogAPI/BlogAPI";
import { useLoader } from "../../Context/Context";
import { Helmet } from "react-helmet-async";

interface Blog {
  blogID: number;
  blogKeyID: string;
  title: string;
  featureImage: string;
  status: string;
  blogDescription: string;
  publishDate: string;
  author: string;
  metaDescription: String;
  metaTitle: String;
  
}

const Blog3ColumnContent = () => {
  // Pagination
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { page } = useParams<{ page?: string }>();

  // Get page from URL query
  const currentPageNumber = Number(page) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(6);
  const { setLoader } = useLoader();

  useEffect(() => {
    setCurrentPage(currentPageNumber);
  }, [currentPageNumber]);

  useEffect(() => {
    GetAllBlogsList(pageNo, pageSize);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogData = BlogV1Data.slice(startIndex, endIndex);

  const handlePageClick = (data: any) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    GetAllBlogsList(selectedPage, pageSize);

    // Update the URL dynamically
    navigate(`/blogs?page=${selectedPage}`);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const GetAllBlogsList = async (pageNo: number, pageSize: number) => {
    setLoader(true);
    try {
      const res = await GetAllBlogsWeb({
        pageNo: pageNo,
        pageSize: pageSize,
        searchKeyWord: null,
        fromDate: null,
        toDate: null,
      });

      if (res.statusCode === 200) {
        setLoader(false);
        setTotalCount(res.totalCount);
        const currentBlogData = res.responseData?.data;
        const totalCount = res?.totalCount;
        const filteredBlogs = currentBlogData.filter(
          (item: Blog) => item.status === "Active"
        );
        setBlogs(filteredBlogs || []);
        setTotalPages(Math.ceil(totalCount / pageSize));
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
 
      <div className="blog-area blog-grid default-padding">
        <div className="container">
          <div className="blog-item-box">
            <div className="row">
              {blogs.map((blog) => {
                const publishDateObj = new Date(blog.publishDate);
                const formattedDate = {
                  day: publishDateObj.getDate().toString().padStart(2, "0"),
                  month: (publishDateObj.getMonth() + 1)
                    .toString()
                    .padStart(2, "0"),
                  year: publishDateObj.getFullYear().toString(),
                };

                return (
                  <div
                    className="col-xl-4 col-md-6 single-item"
                    key={blog.blogID}
                  >
                    <SingleBlog2Column
                      blog={{ ...blog, date: formattedDate }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          {totalCount > pageSize && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Blog3ColumnContent;
