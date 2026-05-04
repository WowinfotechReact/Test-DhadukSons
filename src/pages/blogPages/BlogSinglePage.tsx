import { useParams } from "react-router-dom";
import BlogSingleContent from "../../components/blog/BlogSingleContent";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BlogV1Data from '../../assets/jsonData/blog/BlogV1Data.json';
import { Helmet } from "react-helmet-async";

const BlogSinglePage = () => {

    const { id } = useParams();
    const data = BlogV1Data.find(blog => blog.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Blog Single</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Blog Single" breadCrumb="blog-single" />
                {data && <BlogSingleContent blogInfo={data} totalBlogs={BlogV1Data.length} />}
            </LayoutV1>
        </>
    );
};

export default BlogSinglePage;