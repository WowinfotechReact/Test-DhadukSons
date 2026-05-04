import { Link } from "react-router-dom";

interface DataType {
    featureData: {
        id?: number;
        title: string;
        thumb?: string;
    }[];
}

const SingleFeatureV2 = ({ feature }: { feature: DataType }) => {
    const { featureData } = feature;

    return (
        <div className="feature-style-two">
            {featureData.map(data => (
                <div className="product-feature-item" key={data.id}>
                    <div className="thumb">
                        <img src={`/assets/img/icon/${data.thumb}`} alt={data.title} />
                    </div>
                    <h4><Link to={`/service-details/${data.id}`}>{data.title}</Link></h4>
                </div>
            ))}
        </div>
    );
};

export default SingleFeatureV2;
