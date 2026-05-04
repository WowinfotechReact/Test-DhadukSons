import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamV1 from "../../components/team/TeamV1";
import TimelineV1 from "../../components/timeline/TimelineV1";
import WhyChooseV3 from "../../components/whyChoose/WhyChooseV3";
import ProductType from "../../components/products/ProductType";
import FaqV3 from "../../components/faq/FaqV3";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Us</title>
        <meta
          name="description"
          content="We are USDA Certified Organic, sourcing mangoes from Shree Hari Nursery’s farmers to deliver the true taste of world-famous Kesar mango. Know more."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://www.dhadukandsonsfpc.com/about-us"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About Us" />
        <meta
          property="og:description"
          content="We are USDA Certified Organic, sourcing mangoes from Shree Hari Nursery’s farmers to deliver the true taste of world-famous Kesar mango. Know more."
        />
        <meta
          property="og:image"
          content="https://www.dhadukandsonsfpc.com/assets/img/logo.png"
        />
        <meta
          property="og:url"
          content="https://www.dhadukandsonsfpc.com/about-us"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dhaduk and Sons Farmer LLP" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us" />
        <meta
          name="twitter:description"
          content="We are USDA Certified Organic, sourcing mangoes from Shree Hari Nursery’s farmers to deliver the true taste of world-famous Kesar mango. Know more."
        />
        <meta
          name="twitter:image"
          content="https://www.dhadukandsonsfpc.com/assets/img/logo.png"
        />
        <meta name="twitter:site" content="@dhadukandsonsfarmerllp" />

        {/* WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            name: "About Us",
            url: "https://www.dhadukandsonsfpc.com/about-us",
            description:
              "We are USDA Certified Organic, sourcing mangoes from Shree Hari Nursery’s farmers to deliver the true taste of world-famous Kesar mango. Know more.",
            publisher: {
              "@type": "Organization",
              name: "Dhaduk and Sons Farmer LLP",
            },
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home Page",
                item: "https://www.dhadukandsonsfpc.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: "https://www.dhadukandsonsfpc.com/about-us",
              },
            ],
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who can work with Dhaduk and Sons Farmer LLP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Certified organic farmers who follow clean and responsible farming practices can work with us.",
                },
              },
              {
                "@type": "Question",
                name: "What type of products does the company offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer premium freeze-dried mango slices and mango powder made from organically grown mangoes.",
                },
              },
              {
                "@type": "Question",
                name: "Where are the mangoes sourced from?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our mangoes are sourced from trusted organic farmers connected with Shree Hari Nursery in Gujarat, India.",
                },
              },
              {
                "@type": "Question",
                name: "How does the company support organic farmers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The company connects organic farmers with premium markets and helps them get fair value for their produce.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Dhaduk and Sons Farmer LLP different?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It combines traditional Indian farming knowledge with modern processing and global market access.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="About Us" breadCrumb="About-Us" />
        <AboutV1 />
        <ProductType />

        <WhyChooseV3 />
        <FaqV3 />
      </LayoutV1>
    </>
  );
};

export default AboutUsPage;
