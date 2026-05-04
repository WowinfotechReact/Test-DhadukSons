import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
// import ContactV2 from "../../components/contact/ContactV2";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamV3 from "../../components/team/TeamV3";
import ContactV1 from "../../components/contact/ContactV1";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Dhaduk and Sons</title>
        <meta
          name="description"
          content="Dhaduk and Sons Contact Us page for queries on dried mango products and A2 Gir Cow Ghee. Reach out for support, orders, and more. Contact us today!"
        />

        <link rel="canonical" href="https://www.dhadukandsonsfpc.com/contact" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact Us | Dhaduk and Sons" />
        <meta property="og:site_name" content="Dhaduk and Sons" />
        <meta property="og:url" content="https://www.dhadukandsonsfpc.com/contact" />
        <meta property="og:description" content="Dhaduk and Sons Contact Us page for queries on dried mango products and A2 Gir Cow Ghee. Reach out for support, orders, and more. Contact us today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.dhadukandsonsfpc.com/assets/img/logo.png" />



        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Dhaduk and Sons" />
        <meta name="twitter:description" content="Dhaduk and Sons Contact Us page for queries on dried mango products and A2 Gir Cow Ghee. Reach out for support, orders, and more. Contact us today!" />
        <meta name="twitter:image" content="https://www.dhadukandsonsfpc.com/assets/img/logo.png" />


        {/* WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            name: "Contact Us | Dhaduk and Sons",
            url: "https://www.dhadukandsonsfpc.com/contact",
            description: "Dhaduk and Sons Contact Us page for queries on dried mango products and A2 Gir Cow Ghee. Reach out for support, orders, and more. Contact us today!",
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
              name: "Contact Us | Dhaduk and Sons",
              item: "https://www.dhadukandsonsfpc.com/contact"
            }]

          })}
        </script>
        <script>
          {`
     fbq('track', 'Lead');
      }
    `}
        </script>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Contact Us" breadCrumb="Contact" />
        <ContactV1 />
        <TeamV3 />
      </LayoutV1>
    </>
  );
};

export default ContactPage;
