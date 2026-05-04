import { Link } from "react-router-dom";

interface DataType {
  id?: number;
  image?: string;
  title: string;
  description?: string;
}

const SingleServiceV1 = ({ service }: { service: DataType }) => {
  const { id, image, title, description } = service;

  return (
    <>
      <div className="service-style-one-item">
        <div className="thumb">
          <img
            src={`/assets/img/illustration/${image}`}
            alt="Image Not Found"
            className="w-auto"
          />
        </div>
        <div className="info">
          <div className="top">
            <h3>
              <Link to={`/service-details/${id}`}>
                {title.split(" ")[0]}{" "}
                <span>{title.split(" ").slice(1).join(" ")}</span>
              </Link>
            </h3>
          </div>
          <p>{description} </p>
        </div>
        {/* <Link to={`/service-details/${id}`} className="btn-angle"><i className="fas fa-arrow-right" /></Link> */}
      </div>
    </>
  );
};

export default SingleServiceV1;
