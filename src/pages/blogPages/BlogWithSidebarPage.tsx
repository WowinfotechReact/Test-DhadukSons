import { Helmet } from "react-helmet-async";
import BlogWithSidebarContent from "../../components/blog/BlogWithSidebarContent";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";

const BlogWithSidebarPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Blog With Sidebar</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title='Blog Grid' breadCrumb='blog-2-column' />
                <BlogWithSidebarContent />
            </LayoutV1>
        </>
    );
};

export default BlogWithSidebarPage;