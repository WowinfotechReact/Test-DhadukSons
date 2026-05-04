import { Helmet } from "react-helmet-async";
import BlogStandardContent from "../../components/blog/BlogStandardContent";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";

const BlogStandardPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Blog Standard</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Blog Standard" breadCrumb="blog-standard" />
                <BlogStandardContent />
            </LayoutV1>
        </>
    );
};

export default BlogStandardPage;