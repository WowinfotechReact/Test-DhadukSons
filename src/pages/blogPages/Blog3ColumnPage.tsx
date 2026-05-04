import { Helmet } from "react-helmet-async";
import Blog3ColumnContent from "../../components/blog/Blog3ColumnContent";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";

const Blog3ColumnPage = () => {
    return (
        <>
            <Helmet>
                <title>Blogs | Dhaduk and Sons</title>
                <meta
                    name="description"
                    content="Dhaduk and Sons blog shares insights on dried mango products, A2 Gir Cow Ghee, health tips, and recipes. Explore expert content and stay informed. Read now!"
                />

                <link rel="canonical" href="https://www.dhadukandsonsfpc.com/blogs" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Blogs | Dhaduk and Sons" />
                <meta property="og:site_name" content="Dhaduk and Sons" />
                <meta property="og:url" content="https://www.dhadukandsonsfpc.com/blogs" />
                <meta property="og:description" content="Dhaduk and Sons blog shares insights on dried mango products, A2 Gir Cow Ghee, health tips, and recipes. Explore expert content and stay informed. Read now!" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.dhadukandsonsfpc.com/assets/img/logo.png" />



                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blogs | Dhaduk and Sons" />
                <meta name="twitter:description" content="Dhaduk and Sons blog shares insights on dried mango products, A2 Gir Cow Ghee, health tips, and recipes. Explore expert content and stay informed. Read now!" />
                <meta name="twitter:image" content="https://www.dhadukandsonsfpc.com/assets/img/logo.png" />


                {/* WebPage Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "WebPage",
                        name: "Blogs | Dhaduk and Sons",
                        url: "https://www.dhadukandsonsfpc.com/blogs",
                        description: "Dhaduk and Sons blog shares insights on dried mango products, A2 Gir Cow Ghee, health tips, and recipes. Explore expert content and stay informed. Read now!",
                        publisher: {
                            "@type": "Organization",
                            name: "Dhaduk and Sons"
                        }


                    })}
                </script>

                {/* Breadcrumb Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "BreadcrumbList",
                        itemListElement: [{
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: "https://www.dhadukandsonsfpc.com/"
                        }, {
                            "@type": "ListItem",
                            position: 2,
                            name: "Blogs | Dhaduk and Sons",
                            item: "https://www.dhadukandsonsfpc.com/blogs"
                        }]


                    })}
                </script>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Blogs" breadCrumb="Blogs" />
                <Blog3ColumnContent />
            </LayoutV1>
        </>
    );
};

export default Blog3ColumnPage;