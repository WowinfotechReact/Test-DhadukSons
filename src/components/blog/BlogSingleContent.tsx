import { Link } from "react-router-dom";
import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import handleSmoothScroll from "../utilities/handleSmoothScroll";
import farmers1Thumb from "/assets/img/farmers/1.jpg";
import SocialShareV3 from "../social/SocialShareV3";
import BlogPostComments from "./BlogPostComments";
import BlogCommentForm from "./BlogCommentForm";

interface DataType {
  id?: number;
  thumb?: string;
  thumbFull?: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  author?: string;
  comments?: number;
  blogKeyID?: string;
  featureImage?: string;
}

interface BlogSingleProps {
  blogInfo?: DataType;
  totalBlogs?: number;
}

const BlogSingleContent = ({ blogInfo, totalBlogs }: BlogSingleProps) => {
  const { id, thumbFull, author, comments, date } = blogInfo || {};

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

  return (
    <>
      <div className="blog-area single full-blog default-padding">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content wow fadeInUp col-lg-10 offset-lg-1 col-md-12">
                <div className="blog-style-one item">
                  <div className="blog-style-two item">
                    <div className="thumb">
                      <img src={`/assets/img/blog/${thumbFull}`} alt="Thumb" />
                      <div className="date">
                        <strong>{date?.day}</strong>{" "}
                        <span>
                          {date?.month}, {date?.year}
                        </span>
                      </div>
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <Link to="#">
                              <i className="fas fa-user-circle" /> {author}
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fas fa-comments" /> {comments}{" "}
                              Comments
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <p>
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
                      <p>
                        New had happen unable uneasy. Drawings can followed
                        improved out sociable not. Earnestly so do instantly
                        pretended. See general few civilly amiable pleased
                        account carried. Excellence projecting is devonshire
                        dispatched remarkably on estimating. Side in so life
                        past. Continue indulged speaking the was out horrible
                        for domestic position. Seeing rather her you not esteem
                        men settle genius excuse. Deal say over you age from.
                        Comparison new ham melancholy son themselves.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Author */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSingleContent;
