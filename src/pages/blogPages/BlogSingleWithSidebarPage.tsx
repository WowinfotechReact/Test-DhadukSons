import BlogSingleWithSidebarContent from "../../components/blog/BlogSingleWithSidebarContent";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogBySlugAPIWeb } from "../../APIServices/BlogAPI/BlogAPI";
import { useEffect, useState } from "react";

const BlogSingleWithSidebarPage = () => {
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState<null | any>(null);
  //   const data = BlogV1Data.find((blog) => blog.id === parseInt(id || "0"));

  useEffect(() => {
    getBlogBySingleID();
  }, [id]);

  const getBlogBySingleID = async () => {
    try {
      const res = await getBlogBySlugAPIWeb(id);
      if (res) {
        const blogData = res.responseData.data;

        const publishDateObj = new Date(blogData.publishDate);
        const formattedDate = {
          day: publishDateObj.getDate().toString().padStart(2, "0"),
          month: (publishDateObj.getMonth() + 1).toString().padStart(2, "0"),
          year: publishDateObj.getFullYear().toString(),
        };
        setSingleBlog({ ...blogData, formattedDate });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>
          {singleBlog?.metaTitle
            ? `${singleBlog.metaTitle}`
            : "Dhaduk And Sons Farmer LLP"}
        </title>
      </Helmet> */}

      <LayoutV1>
        <BreadCrumb title={singleBlog?.metaTitle} breadCrumb="Blog Detail" />
        {singleBlog && (
          <BlogSingleWithSidebarContent
            singleBlogData={singleBlog}
            totalBlogs={BlogV1Data.length}
          />
        )}
      </LayoutV1>
    </>
  );
};

export default BlogSingleWithSidebarPage;
