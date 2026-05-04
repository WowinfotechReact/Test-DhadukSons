import { Link } from "react-router-dom";

interface DataType {
  id?: number;
  thumbFull?: string;
  title: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  author?: string;
  full_date?: string;
  description?: string;
  blogKeyID?: string;
  featureImage?: string;
}

const SingleBlogContentV1 = ({ blog }: { blog: DataType }) => {
  const { thumbFull, id, title, date, author, full_date, description } = blog;

  return (
    <>
      <div className="item">
        <div className="thumb">
          <Link to={`/blog/${id}`}>
            <img src={`/assets/img/blog/${thumbFull}`} alt={title} />
          </Link>
          <div className="date">
            <strong>{date.day}</strong>{" "}
            <span>
              {date.month}, {date.year}
            </span>
          </div>
        </div>
        <div className="info">
          <div className="meta">
            <ul>
              <li>
                <Link to="#">{author}</Link>
              </li>
              <li>{full_date}</li>
            </ul>
          </div>
          <h3 className="post-title">
            <Link to={`/blog/${id}`}>{title}</Link>
          </h3>
          <p>{description}</p>
          <Link
            className="btn mt-10 btn-md btn-theme secondary animation"
            to={`/blog/${id}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBlogContentV1;
