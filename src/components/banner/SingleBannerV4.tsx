import { Link } from "react-router-dom";

interface DataType {
    id: number;
    shapeImage: string;
    title: string;
    tags: string[];
    buttonText: string;
}

const SingleBannerV4 = ({ banner }: { banner: DataType }) => {
    const { shapeImage, title, tags } = banner

    return (
        <>
            <div className="shape">
                <img src={`/assets/img/shape/${shapeImage}`} alt="Image Not Found" />
            </div>
            <div className="container">
                <div className="row align-center">
                    <div className="col-xl-10 offset-lg-1">
                        <div className="content">
                            <div className="info">
                                <h2>{title}</h2>
                                <ul>
                                    {tags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </ul>
                                <div className="button">
                                   <Link className="btn btn-theme mt-30 btn-md radius animation" to="/about-us">Discover More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBannerV4;