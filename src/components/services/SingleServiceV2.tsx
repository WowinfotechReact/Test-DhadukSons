import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    icon?: string;
    title: string;
    category?: string;
}

const SingleServiceV2 = ({ service }: { service: DataType }) => {
    const { id, thumb, icon, title, category } = service;

    return (
        <div className="service-style-two">
            <div className="thumb">
                <img
                    src={`/assets/img/services/${thumb}`}
                    alt={title}
                    className='h-auto'
                />
            </div>
            <div className="overlay">
                <div className="icon">
                    <img
                        src={`/assets/img/icon/${icon}`}
                        alt={`${title} icon`}
                        className='h-auto'
                    />
                </div>
                <div className="info">
                    <h4><Link to={`/service-details/${id}`}>{title}</Link></h4>
                    <span>{category}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleServiceV2;
