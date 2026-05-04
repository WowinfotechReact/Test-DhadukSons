import { Link } from "react-router-dom";

interface DataType {
  id?: number;
  title?: string;
  full_date?: string;
  thumb?: string;
}

const FooterRecentPost = ({ blog }: { blog: DataType }) => {
  const { id, title, full_date, thumb } = blog;

  return (
    <>
      <li>
        <div className="thumb">
          <Link to={`/blog/${id}`}>
            <img
              src={`/assets/img/thumbs/${thumb}`}
              alt="Thumb"
              className="h-auto"
            />
          </Link>
        </div>
        <div className="info">
          <div className="meta-title">
            <span className="post-date">{full_date}</span>
          </div>
          <h5>
            <Link to={`/blog/${id}`}>{title}</Link>
          </h5>
        </div>
      </li>
    </>
  );
};

export default FooterRecentPost;
