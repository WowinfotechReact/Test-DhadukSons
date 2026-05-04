import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    name?: string;
    thumb?: string;
}

const SingleProductCategory = ({ product }: { product: DataType }) => {
    const { id, name, thumb } = product

    return (
        <>
            <div className="product-list-item">
                <Link to={`/service-details/${id}`}>
                    <img src={`/assets/img/icon/${thumb}`} alt="Icon" className="w-auto" />
                    <h5>{name}</h5>
                </Link>
            </div>
        </>
    );
};

export default SingleProductCategory;