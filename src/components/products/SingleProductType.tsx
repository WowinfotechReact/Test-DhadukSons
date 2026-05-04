import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    number?: string;
    title?: string;
    description?: string;
}

const SingleProductType = ({ product }: { product: DataType }) => {
    const { thumb, number, title, description } = product;

    return (
        <div className="product-type-item">
            <div className="thumb">
                <img src={`/assets/img/product/${thumb}`} alt="Image Not Found" />
              
            </div>
            <div className="info">
                <h4><Link to="#">{title}</Link></h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default SingleProductType;
