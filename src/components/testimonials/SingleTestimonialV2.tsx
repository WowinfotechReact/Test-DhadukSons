import RatingsStar from "../utilities/RatingsStar";

interface DataType {
  id?: number;
  ratings: number;
  testimonial?: string;
  name: string;
  designation?: string;
  avatar?: string;
  quoteIcon?: string;
}

const SingleTestimonialV2 = ({ testimonial }: { testimonial: DataType }) => {
  const { avatar, ratings, quoteIcon, name, designation } = testimonial;

  return (
    <>
      <div className="testimonial-style-two">
        <div className="item-info">
          <div className="info">
            <div className="content">
              <h4 className="test-name">{name}</h4>
              <span className="test-position">{designation}</span>
            </div>
          </div>
          <div className="rating">
            <RatingsStar ratings={ratings} />
          </div>
          <p>“{testimonial.testimonial}”</p>
        </div>
        <div className="provider">
          <div className="thumb">
            {/* <img src={`/assets/img/farmers/${avatar}`} alt={name} /> */}
            <div className="quote">
              <img src={`/assets/img/shape/${quoteIcon}`} alt="Quote Icon" />
            </div>
          </div>
          {/* <div className="info">
                        <div className="content">
                            <h4>{name}</h4>
                            <span>{designation}</span>
                        </div>
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default SingleTestimonialV2;
