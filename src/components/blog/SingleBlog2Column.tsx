import { Link } from "react-router-dom";
import { dataMonth } from "../Utils";

interface DataType {
  blogID: number;
  blogKeyID?: string;

  slug: string;
  title: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  author: string;
  featureImage?: string;
}

const SingleBlog2Column = ({ blog }: { blog: DataType }) => {
  const { blogID, title, author, date, slug } = blog;

  const monthName = dataMonth[parseInt(date?.month, 10)];

  return (
    <>
      <div className="blog-style-one">
        <div className="thumb">
          <Link to={`/blog/${slug}`}>
            <img src={blog.featureImage} alt={title} />
          </Link>
          <div className="date">
            <strong>{date.day}</strong>{" "}
            <span>
              {monthName}, {date.year}
            </span>
          </div>
        </div>
        <div className="info">
          <div className="meta">
            <ul>
              <li>
                <Link to="#">{author}</Link>
              </li>
              {/* <li>
                <Link to="#">{comments} Comments</Link>
              </li> */}
            </ul>
          </div>
          <h3 className="post-title">
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h3>
          <Link to={`/blog/${slug}`} className="button-regular">
            Continue Reading <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBlog2Column;
