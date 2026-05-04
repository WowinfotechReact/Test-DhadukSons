import { Helmet } from "react-helmet-async";
import BannerV2 from "../../components/banner/BannerV2";
// import BlogV1 from "../../components/blog/BlogV1";
// import CallToAction from "../../components/cta/CallToAction";
import FaqV1 from "../../components/faq/FaqV1";
import ProductV1 from "../../components/products/ProductV1";
import FeatureV1 from "../../components/feature/FeatureV1";
// import GalleryV2 from "../../components/gallery/GalleryV2";
import LayoutV2 from "../../components/layouts/LayoutV2";
import ContactV1 from "../../components/contact/ContactV1";
import BenefitsV1 from "../../components/benefits/BenefitsV1";
import Partner from "../../components/partner/Partner";
import History from "../../components/history/History";
import WhyChooseV2 from "../../components/whyChoose/WhyChooseV2";
import TestimonialV2 from "../../components/testimonials/TestimonialV2";
import ServiceV1 from "../../components/services/ServiceV1";
import BannerV3 from "../../components/banner/BannerV3";
import ProductSpeciality from "../../components/products/ProductSpeciality";
import WhyChooseV4 from "../../components/whyChoose/WhyChooseV4";
import ProductCategory from "../../components/products/ProductCategory";
const Home2 = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Taste the Authentic Kesar Freeze Dried Mango from Gujarat</title>
        <meta
          name="description"
          content="Taste the Authentic Kesar Freeze Dried Mango from Gujarat, India. Made using traditional methods with farm-fresh mangoes. Buy online today."
        />

        <link rel="canonical" href="https://www.dhadukandsonsfpc.com/" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Taste the Authentic Kesar Freeze Dried Mango from Gujarat"
        />
        <meta
          property="og:description"
          content="Taste the Authentic Kesar Freeze Dried Mango from Gujarat, India. Made using traditional methods with farm-fresh mangoes. Buy online today."
        />
        <meta
          property="og:image"
          content="https://www.dhadukandsonsfpc.com/assets/img/logo.png"
        />
        <meta property="og:url" content="https://www.dhadukandsonsfpc.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dhaduk and Sons Farmer LLP" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Taste the Authentic Kesar Freeze Dried Mango from Gujarat"
        />
        <meta
          name="twitter:description"
          content="Taste the Authentic Kesar Freeze Dried Mango from Gujarat, India. Made using traditional methods with farm-fresh mangoes. Buy online today."
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
            name: "Taste the Authentic Kesar Freeze Dried Mango from Gujarat",
            url: "https://www.dhadukandsonsfpc.com/",
            description:
              "Taste the Authentic Kesar Freeze Dried Mango from Gujarat, India. Made using traditional methods with farm-fresh mangoes. Buy online today.",
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
                name: "Home",
                item: "https://www.dhadukandsonsfpc.com/",
              },
            ],
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Dhaduk and Sons Farmer LLP",
            url: "https://www.dhadukandsonsfpc.com/",
            logo: "https://www.dhadukandsonsfpc.com/assets/img/logo.png",
            sameAs: [
              "https://www.facebook.com/share/1EABACL58Y/?mibextid=wwXIfr",
              "https://www.instagram.com/dhaduk_and_sons_farmerllp",
            ],
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [{
              "@type": "Question",
              name: "1. Are freeze-dried mangoes healthy?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Our freeze-dried mangoes retain most of their natural vitamins, minerals, and fibre because they are processed gently after being grown under controlled organic farming practices."
              }
            }, {
              "@type": "Question",
              name: "2. Is it safe to eat freeze-dried mango every day?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. When enjoyed in moderation, they make a wholesome daily snack sourced from mangoes grown and handled responsibly from plantation to processing."
              }
            }, {
              "@type": "Question",
              name: "3. Is this product made from real organic mangoes?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The mangoes come from organically grown plants developed at Shree Hari Nursery and cultivated by trained farmers under USDA National Organic Program standards."
              }
            }, {
              "@type": "Question",
              name: "4. Does the dried mango contain added sugar or preservatives?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Our mangoes contain no added sugar, colours, or preservatives, only naturally ripened fruit processed within our farmer-linked ecosystem."
              }
            }, {
              "@type": "Question",
              name: "5. How is your supply chain different from other brands?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Unlike conventional brands that buy mangoes from open markets, we work directly with farmers from nursery plants to harvest to processing, ensuring full traceability, ethical sourcing, and consistent quality."
              }
            }, {
              "@type": "Question",
              name: "6. Why does this matter to consumers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It means authentic organic integrity, reliable taste, transparent sourcing, and a product that supports farmers rather than disconnected processing factories."
              }
            }]

          })}
        </script>

        {/* Local Business Schema: */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Dhaduk and Sons",
            image: "https://www.dhadukandsonsfpc.com/assets/img/logo.png",
            "@id": "https://www.dhadukandsonsfpc.com",
            url: "https://www.dhadukandsonsfpc.com",
            telephone: "+91 9601182335",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Block No. 119, Near Main Canal Areth Bodhan Road, Areth, Mandvi",
              addressLocality: "Surat",
              postalCode: "394170",
              addressCountry: "IN"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 21.283485,
              longitude: 73.0843379
            }
          })}



        </script>


      </Helmet>

      <LayoutV2>
        <BannerV3 />
        <ProductSpeciality />
        <WhyChooseV4 />
        {/* <BannerV2 /> */}
        {/* <FeatureV1 /> */}
        <ProductV1 />
        <ProductCategory />
        {/* <History /> */}
        <BenefitsV1 />
        <ServiceV1 hasTitle={true} />
        <TestimonialV2 />
        <WhyChooseV2 />

        <ContactV1 />

        <FaqV1 sectionClass="bg-gray" />
        {/* <Partner /> */}
        {/* <CallToAction /> */}
        {/* <BlogV1 /> */}
      </LayoutV2>
    </>
  );
};

export default Home2;
