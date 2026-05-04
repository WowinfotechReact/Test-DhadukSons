import { Link } from "react-router-dom";

interface DataType {
  id?: number;
  bannerImage?: string;
  bannerSubTitle?: string;
  bannerTitle: string;
  buttonText?: string;
}

const SingleBannerV3 = ({ banner }: { banner: DataType }) => {
  const {
    bannerImage,
    bannerSubTitle,
    bannerTitle,
    buttonText = "View Product Details",
  } = banner;

  console.log(banner);

  // Split the bannerTitle into words
  const words = bannerTitle?.split(" ");
  const firstTwoWords = words?.slice(0, 2).join(" ");
  const restWords = words?.slice(2).join(" ");

  return (
    <>
      <div
        className="banner-thumb bg-cover shadow dark"
        style={{
          backgroundImage: `url(${banner.bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container">
        <div className="row align-center">
          <div className="col-lg-8">
            <div className="content">
              <h4>{bannerSubTitle}</h4>
              {bannerSubTitle === "USDA CERTIFIED " ? (
                <h1>
                  <strong>{firstTwoWords}</strong> {restWords}
                </h1>
              ) : (
                <h2>
                  <strong>{firstTwoWords}</strong> {restWords}
                </h2>
              )}
              <div className="button">
                <Link
                  className="btn btn-theme btn-md radius animation"
                  to={
                    bannerSubTitle === "Gir Cow Ghee"
                      ? "/products/gir-cow-ghee"
                      : bannerSubTitle === "USDA CERTIFIED "
                        ? "/products/freeze-dried-mango"
                        : ""
                  }
                >
                  {buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBannerV3;
