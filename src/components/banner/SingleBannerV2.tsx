import { Link } from "react-router-dom";

interface DataType {
  thumb?: string;
  // title: string;
  // description?: string;
  // buttonText?: string;
  // buttonIcon?: string;
  bannerKeyID?: string;
  bannerTitle?: string;
  bannerSubTitle?: string;
  bannerImage?: string;
  status?: string;
}

const SingleBannerV2 = ({ banner }: { banner: DataType }) => {
  const {
    thumb,
    // title,
    // description,
    // buttonText,
    // buttonIcon,
    bannerTitle,
    bannerSubTitle,
    bannerImage,
  } = banner;

  // Split bannerTitle for optional styling, e.g. bold last word
  const title = bannerTitle ?? "";
  const [firstWord, ...rest] = title.split(" ");
  const restTitle = rest.join(" ");

  return (
    <div className="banner-style-two">
      <div
        className="banner-thumb bg-cover shadow dark"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />
      <div className="container">
        <div className="row align-center">
          <div className="col-lg-8 offset-lg-2">
            <div className="content">
              <h2>
                {firstWord} <strong>{restTitle}</strong>
              </h2>
              <p>{bannerSubTitle}</p>
              {/* <div className="button">
                <Link className="animated-btn" to="/about-us">
                  <i className={buttonIcon} /> {buttonText}
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBannerV2;
