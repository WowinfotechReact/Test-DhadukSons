import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    title?: string;
    thumb?: string;
}

const SingleFeatureV1 = ({ feature }: { feature: DataType }) => {
    const { id, title, thumb } = feature;

    return (
        <>
            <div className="product-list-item">
                <Link to={`/service-details/${id}`} >
                    <img src={`/assets/img/icon/${thumb}`} alt="Icon" />
                    <h5 className="list-hide">{title}</h5>
                </Link>
            </div>
        </>
    );
};

export default SingleFeatureV1;