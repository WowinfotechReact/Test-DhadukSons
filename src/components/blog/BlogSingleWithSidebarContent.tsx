import { Link } from "react-router-dom";
import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import handleSmoothScroll from "../utilities/handleSmoothScroll";
import farmers1Thumb from "/assets/img/farmers/1.jpg";
import SocialShareV3 from "../social/SocialShareV3";
import BlogPostComments from "./BlogPostComments";
import BlogCommentForm from "./BlogCommentForm";
import SearchWidget from "../widgets/SearchWidget";
import RecentPostsWidget from "../widgets/RecentPostsWidget";
import CategoryWidget from "../widgets/CategoryWidget";
import GalleryWidget from "../widgets/GalleryWidget";
import ArchiveWidget from "../widgets/ArchiveWidget";
import FollowWidget from "../widgets/FollowWidget";
import TagsWidget from "../widgets/TagsWidget";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";

interface DataType {
  id?: number;
  thumbFull?: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  author?: string;
  comments?: number;
  blogKeyID: string;
  featureImage: string;
  slug: string;
}

interface BlogObjDataType {
  blogKeyID?: string;
  title?: string;
  blogDescription?: string;
  formattedDate?: {
    day: string;
    month: string;
    year: string;
  };
  author?: string;
  featureImage?: string;
  publishDate?: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface BlogSingleProps {
  blogInfo?: DataType;
  totalBlogs?: number;
  singleBlogData?: BlogObjDataType;
}
type ProductKey = "ghee" | "honey";

const BlogSingleWithSidebarContent = ({
  blogInfo,
  totalBlogs,
  singleBlogData,
}: BlogSingleProps) => {
  const { id, thumbFull, author, comments, date } = blogInfo || {};
  console.log(singleBlogData);
  const canonicalUrl = `${window.location.origin}${location.pathname}`;
  // Blogs Navigation
  const currentId = id ? parseInt(id.toString(), 10) : 1;

  // Calculate the previous and next IDs dynamically
  const previousId = currentId === 1 ? totalBlogs : currentId - 1;
  const nextId = currentId === totalBlogs ? 1 : currentId + 1;

  // Get the previous and next project titles
  const previousBlog = BlogV1Data.find((blog) => blog.id === previousId);
  const nextBlog = BlogV1Data.find((blog) => blog.id === nextId);

  // Get the first two words of the project title
  const getFirstTwoWords = (text?: string) =>
    text?.split(" ").slice(0, 2).join(" ") || "No Title";


  const faqData: Record<ProductKey, { question: string; answer: string }[]> = {
    ghee: [
      {
        question: "What is A2 Gir Cow Ghee?",
        answer: "A2 Gir Cow Ghee is made from milk of Gir cows containing A2 protein, which is easier to digest and rich in nutrients."
      },
      {
        question: "What is Bilona Cow Ghee?",
        answer: "Bilona Cow Ghee is prepared using the traditional Bilona method, making sure authentic taste, aroma, and nutritional value."
      },
      {
        question: "How can I use A2 Gir Cow Ghee?",
        answer: "It can be used for cooking, frying, baking, or consumed daily as a healthy supplement."
      },
      {
        question: "Is A2 Gir Cow Ghee good for digestion?",
        answer: "Yes, it supports better digestion and nutrient absorption."
      },
      {
        question: "Can kids consume this ghee?",
        answer: "Absolutely, it is healthy for kids and adults, providing essential vitamins and healthy fats."
      },
    ],
    honey: [
      {
        question: " Are freeze-dried mangoes healthy?",
        answer: "Yes. Freeze-dried mango keeps most of the fruit’s natural vitamins, fibre, and antioxidants without added sugar or preservatives."
      },
      {
        question: "Is freeze-dried mango better than fresh mango?",
        answer: "Freeze-dried mango offers similar nutrition to fresh mango but lasts longer and is easier to carry and store."
      },
      {
        question: "Does freeze-dried mango contain added sugar?",
        answer: "No. Pure freeze-dried mango is naturally sweet and contains no added sugar."
      },
      {
        question: " Can kids eat freeze-dried mango?",
        answer: "Yes. It is a safe, natural, and healthy snack for kids when made from mango."
      },
    ]

  };

  const getFAQSchema = (productKey: ProductKey) => {
    const faqs = faqData[productKey];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
  };

  const productType: ProductKey = singleBlogData?.slug == "gir-cow-ghee" ? "ghee" : singleBlogData?.slug == "freeze-dried-mango" ? "honey" : "ghee";
  return (
    <>
      <Helmet>
        {/* Title */}
        <title>{singleBlogData?.metaTitle || singleBlogData?.title}</title>

        {/* Meta Description */}
        <meta
          name="description"
          content={
            singleBlogData?.metaDescription ||
            singleBlogData?.blogDescription
              ?.replace(/<[^>]+>/g, "")
              .slice(0, 160)
          }
        />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={singleBlogData?.title} />
        <meta
          property="og:description"
          content={
            singleBlogData?.metaDescription ||
            singleBlogData?.blogDescription
              ?.replace(/<[^>]+>/g, "")
              .slice(0, 160)
          }
        />
        <meta property="og:site_name" content="Dhaduk and Sons" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={singleBlogData?.featureImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={singleBlogData?.metaTitle} />
        <meta
          name="twitter:description"
          content={
            singleBlogData?.metaDescription ||
            singleBlogData?.blogDescription
              ?.replace(/<[^>]+>/g, "")
              .slice(0, 160)
          }
        />
        <meta name="twitter:image" content={singleBlogData?.featureImage} />


      </Helmet>
      <div className="blog-area single full-blog right-sidebar full-blog default-padding">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
                <div className="blog-style-one item">
                  <div className="blog-style-two item">
                    <div className="thumb">
                      <img src={singleBlogData?.featureImage} alt="Thumb" />
                      {/* <div className="date">
                        <strong>{singleBlogData?.formattedDate?.day}</strong>{" "}
                        <span>
                          {singleBlogData?.formattedDate?.month},{" "}
                          {singleBlogData?.formattedDate?.year}
                        </span>
                      </div> */}
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul className="d-flex justify-content-between">
                          <li>
                            <Link to="#">
                              <i className="fas fa-user-circle" />{" "}
                              <h1>{singleBlogData?.title} </h1>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fas fa-calendar" />

                              {dayjs(singleBlogData?.publishDate).format(
                                "DD/MM/YYYY"
                              )}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: singleBlogData?.blogDescription || "",
                        }}
                      />

                      {/* <p>
                        Give lady of they such they sure it. Me contained
                        explained my education. Vulgar as hearts by garret.
                        Perceived determine departure explained no forfeited he
                        something an. Contrasted dissimilar get joy you
                        instrument out reasonably. Again keeps at no meant
                        stuff. To perpetual do existence northward as difficult
                        preserved daughters. Continued at up to zealously
                        necessary breakfast. Surrounded sir motionless she end
                        literature. Gay direction neglected but supported yet
                        her.
                      </p>

                      <h3>Conduct replied off led whether?</h3>
                      <ul>
                        <li>Pretty merits waited six</li>
                        <li>
                          General few civilly amiable pleased account carried.
                        </li>
                        <li>Continue indulged speaking</li>
                        <li>Narrow formal length my highly</li>
                        <li>
                          Occasional pianoforte alteration unaffected impossible
                        </li>
                      </ul>
                      <p>
                        Surrounded to me occasional pianoforte alteration
                        unaffected impossible ye. For saw half than cold. Pretty
                        merits waited six talked pulled you. Conduct replied off
                        led whether any shortly why arrived adapted. Numerous
                        ladyship so raillery humoured goodness received an. So
                        narrow formal length my highly longer afford oh. Tall
                        neat he make or at dull ye. Lorem ipsum dolor, sit amet
                        consectetur adipisicing, elit. Iure, laudantium,
                        tempore. Autem dolore repellat, omnis quam? Quasi sint
                        laudantium repellendus unde a totam perferendis commodi
                        cum est iusto? Minima, laborum.
                      </p> */}
                    </div>
                  </div>
                </div>

                {/* Post Author */}

                {/* Post Tags Share */}

                {/* Post Pagination */}

                {/* Start Blog Comment */}
              </div>

              <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-100 mt-xs-50">
                <aside>
                  <RecentPostsWidget blogKeyID={singleBlogData?.blogKeyID} slug={singleBlogData?.slug} />

                  <GalleryWidget />
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSingleWithSidebarContent;

// import { Link } from "react-router-dom";
// import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
// import handleSmoothScroll from "../utilities/handleSmoothScroll";
// import farmers1Thumb from "/assets/img/farmers/1.jpg";
// import SocialShareV3 from "../social/SocialShareV3";
// import BlogPostComments from "./BlogPostComments";
// import BlogCommentForm from "./BlogCommentForm";
// import SearchWidget from "../widgets/SearchWidget";
// import RecentPostsWidget from "../widgets/RecentPostsWidget";
// import CategoryWidget from "../widgets/CategoryWidget";
// import GalleryWidget from "../widgets/GalleryWidget";
// import ArchiveWidget from "../widgets/ArchiveWidget";
// import FollowWidget from "../widgets/FollowWidget";
// import TagsWidget from "../widgets/TagsWidget";
// import dayjs from "dayjs";
// import { Helmet } from "react-helmet-async";

// interface DataType {
//   id?: number;
//   thumbFull?: string;
//   date: {
//     day: string;
//     month: string;
//     year: string;
//   };
//   author?: string;
//   comments?: number;
//   blogKeyID: string;
//   featureImage: string;
// }

// interface BlogObjDataType {
//   blogKeyID?: string;
//   title?: string;
//   blogDescription?: string;
//   formattedDate?: {
//     day: string;
//     month: string;
//     year: string;
//   };
//   author?: string;
//   featureImage?: string;
//   publishDate?: string;
// }

// interface BlogSingleProps {
//   blogInfo?: DataType;
//   totalBlogs?: number;
//   singleBlogData?: BlogObjDataType;
// }

// const BlogSingleWithSidebarContent = ({
//   blogInfo,
//   totalBlogs,
//   singleBlogData,
// }: BlogSingleProps) => {
//   const { id, thumbFull, author, comments, date } = blogInfo || {};
//   console.log(singleBlogData);
//   const canonicalUrl = `${window.location.origin}${location.pathname}`;
//   // Blogs Navigation
//   const currentId = id ? parseInt(id.toString(), 10) : 1;

//   // Calculate the previous and next IDs dynamically
//   const previousId = currentId === 1 ? totalBlogs : currentId - 1;
//   const nextId = currentId === totalBlogs ? 1 : currentId + 1;

//   // Get the previous and next project titles
//   const previousBlog = BlogV1Data.find((blog) => blog.id === previousId);
//   const nextBlog = BlogV1Data.find((blog) => blog.id === nextId);

//   // Get the first two words of the project title
//   const getFirstTwoWords = (text?: string) =>
//     text?.split(" ").slice(0, 2).join(" ") || "No Title";

//   return (
//     <>
//       <Helmet>
//         {/* Title */}
//         <title>{singleBlogData.metaTitle || singleBlogData.title}</title>

//         {/* Meta Description */}
//         <meta
//           name="description"
//           content={
//             singleBlogData.metaDescription ||
//             singleBlogData.blogDescription
//               ?.replace(/<[^>]+>/g, "")
//               .slice(0, 160)
//           }
//         />

//         {/* Canonical */}
//         <link rel="canonical" href={canonicalUrl} />

//         {/* Open Graph (Facebook, LinkedIn) */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={singleBlogData.title} />
//         <meta
//           property="og:description"
//           content={
//             singleBlogData.metaDescription ||
//             singleBlogData.blogDescription
//               ?.replace(/<[^>]+>/g, "")
//               .slice(0, 160)
//           }
//         />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content={singleBlogData.featureImage} />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={singleBlogData.metaTitle} />
//         <meta
//           name="twitter:description"
//           content={
//             singleBlogData.metaDescription ||
//             singleBlogData.blogDescription
//               ?.replace(/<[^>]+>/g, "")
//               .slice(0, 160)
//           }
//         />
//         <meta name="twitter:image" content={singleBlogData.featureImage} />
//       </Helmet>
//       <div className="blog-area single full-blog right-sidebar full-blog default-padding">
//         <div className="container">
//           <div className="blog-items">
//             <div className="row">
//               <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
//                 <div className="blog-style-one item">
//                   <div className="blog-style-two item">
//                     <div className="thumb">
//                       <img src={singleBlogData?.featureImage} alt="Thumb" />
//                       {/* <div className="date">
//                         <strong>{singleBlogData?.formattedDate?.day}</strong>{" "}
//                         <span>
//                           {singleBlogData?.formattedDate?.month},{" "}
//                           {singleBlogData?.formattedDate?.year}
//                         </span>
//                       </div> */}
//                     </div>
//                     <div className="info">
//                       <div className="meta">
//                         <ul className="d-flex justify-content-between">
//                           <li>
//                             <Link to="#">
//                               <i className="fas fa-user-circle" />{" "}
//                               <h1>{singleBlogData?.title}</h1>
//                             </Link>
//                           </li>
//                           <li>
//                             <Link to="#">
//                               <i className="fas fa-calendar" />

//                               {dayjs(singleBlogData?.publishDate).format(
//                                 "DD/MM/YYYY"
//                               )}
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: singleBlogData?.blogDescription || "",
//                         }}
//                       />

//                       {/* <p>
//                         Give lady of they such they sure it. Me contained
//                         explained my education. Vulgar as hearts by garret.
//                         Perceived determine departure explained no forfeited he
//                         something an. Contrasted dissimilar get joy you
//                         instrument out reasonably. Again keeps at no meant
//                         stuff. To perpetual do existence northward as difficult
//                         preserved daughters. Continued at up to zealously
//                         necessary breakfast. Surrounded sir motionless she end
//                         literature. Gay direction neglected but supported yet
//                         her.
//                       </p>

//                       <h3>Conduct replied off led whether?</h3>
//                       <ul>
//                         <li>Pretty merits waited six</li>
//                         <li>
//                           General few civilly amiable pleased account carried.
//                         </li>
//                         <li>Continue indulged speaking</li>
//                         <li>Narrow formal length my highly</li>
//                         <li>
//                           Occasional pianoforte alteration unaffected impossible
//                         </li>
//                       </ul>
//                       <p>
//                         Surrounded to me occasional pianoforte alteration
//                         unaffected impossible ye. For saw half than cold. Pretty
//                         merits waited six talked pulled you. Conduct replied off
//                         led whether any shortly why arrived adapted. Numerous
//                         ladyship so raillery humoured goodness received an. So
//                         narrow formal length my highly longer afford oh. Tall
//                         neat he make or at dull ye. Lorem ipsum dolor, sit amet
//                         consectetur adipisicing, elit. Iure, laudantium,
//                         tempore. Autem dolore repellat, omnis quam? Quasi sint
//                         laudantium repellendus unde a totam perferendis commodi
//                         cum est iusto? Minima, laborum.
//                       </p> */}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Post Author */}

//                 {/* Post Tags Share */}

//                 {/* Post Pagination */}

//                 {/* Start Blog Comment */}
//               </div>

//               <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-100 mt-xs-50">
//                 <aside>
//                   <RecentPostsWidget blogKeyID={singleBlogData?.blogKeyID} />

//                   <GalleryWidget />
//                 </aside>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogSingleWithSidebarContent;
