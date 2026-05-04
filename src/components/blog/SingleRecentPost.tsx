import { Link } from "react-router-dom";

interface Blog {
  id?: number;
  blogKeyID?: string;
  thumb?: string;
  title: string;
  full_date?: string;
  originalDate?: string; // store "2025-08-18 00:00:00"
  featureImage?: string;
  slug?: string;
}

interface SingleRecentPostProps {
  blog: Blog;
}

const SingleRecentPost: React.FC<SingleRecentPostProps> = ({ blog }) => {
  const { blogKeyID, thumb, title, full_date,slug } = blog;
  const publishDateObj = blog?.originalDate
    ? new Date(blog.originalDate)
    : null;

  const formattedDate = publishDateObj
    ? {
        day: publishDateObj.getDate().toString().padStart(2, "0"),
        month: (publishDateObj.getMonth() + 1).toString().padStart(2, "0"),
        year: publishDateObj.getFullYear().toString(),
      }
    : { day: "--", month: "--", year: "----" }; // fallback if date is missing

  const truncateString = (str: string): string => {
    if (str.length <= 47) {
      return str;
    }
    return `${str.slice(0, 47)} ...`;
  };

  const truncatedTitle = truncateString(title);

  return (
    <li>
      <div className="thumb">
        <Link to={`/blog/${slug}`}>
          <img src={blog.featureImage} alt="Thumb" />
        </Link>
      </div>
      <div className="info">
        {/* <div className="meta-title">
          <span className="post-date">{blog.originalDate}</span>
        </div> */}
        <Link to={`/blog/${slug}`}>{truncatedTitle}</Link>
      </div>
    </li>
  );
};

export default SingleRecentPost;
