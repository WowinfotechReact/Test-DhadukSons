import { useEffect, useState } from "react";
import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import SingleRecentPost from "../blog/SingleRecentPost";
import { useLoader } from "../../Context/Context";
import { GetAllBlogs, GetAllBlogsWeb } from "../../APIServices/BlogAPI/BlogAPI";

interface Blog {
  blogID: number;
  blogKeyID?: string;
  title: string;
  featureImage?: string;
  status: string;
  blogDescription: string;
  publishDate: string;
  author: string;
  slug:string;
}

interface RecentPostsWidgetProps {
  blogKeyID?: string | undefined; // or number, depending on your ID type
  slug?: string | undefined; // or number, depending on your ID type
}

const RecentPostsWidget: React.FC<RecentPostsWidgetProps> = ({ blogKeyID, slug }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { setLoader } = useLoader();

  useEffect(() => {
    GetAllBlogsList(1, 15);
  }, [blogKeyID]);

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

        const blogData: Blog[] = res.responseData?.data || [];

        const filteredBlogs = blogData.filter(
          (blog) => blog.slug !== slug && blog.status === "Active"
        );

        setBlogs(filteredBlogs || []);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="sidebar-item recent-post">
        <h4 className="title">Recent Post</h4>
        <ul>
          {blogs.slice(0, 3).map((blog) => (
            <SingleRecentPost blog={blog} key={blog.slug} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecentPostsWidget;
