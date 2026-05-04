import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ShopPageContent from "../../components/shop/ShopPageContent";

const ShopPage = () => {
    return (
        <>
            <Helmet>
                <title>Products | Dhaduk and Sons</title>
                <meta
                    name="description"
                    content="Premium frozen mango products and pure A2 desi ghee by Dhaduk & Sons. Enjoy natural taste, quality, and nutrition delivered fresh to your doorstep."
                />

                <link rel="canonical" href="https://www.dhadukandsonsfpc.com/products" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Products" />
                <meta property="og:site_name" content="Dhaduk and Sons" />
                <meta property="og:url" content="https://www.dhadukandsonsfpc.com/products" />
                <meta property="og:description" content="Premium frozen mango products and pure A2 desi ghee by Dhaduk & Sons. Enjoy natural taste, quality, and nutrition delivered fresh to your doorstep." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.dhadukandsonsfpc.com/assets/img/logo.png" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Products" />
                <meta name="twitter:description" content="Premium frozen mango products and pure A2 desi ghee by Dhaduk & Sons. Enjoy natural taste, quality, and nutrition delivered fresh to your doorstep." />
                <meta name="twitter:image" content="https://www.dhadukandsonsfpc.com/assets/img/logo.png" />

                {/* WebPage Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "WebPage",
                        name: "Product",
                        url: "https://www.dhadukandsonsfpc.com/products",
                        description: "Premium frozen mango products and pure A2 desi ghee by Dhaduk & Sons. Enjoy natural taste, quality, and nutrition delivered fresh to your doorstep.",
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
                            name: "Products",
                            item: "https://www.dhadukandsonsfpc.com/products"
                        }]

                    })}
                </script>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Products" breadCrumb="Products" />
                <ShopPageContent />
            </LayoutV1>
        </>
    );
};

export default ShopPage;