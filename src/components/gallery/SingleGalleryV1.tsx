import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    category?: string;
    title?: string;
}

const SingleGalleryV1 = ({ gallery }: { gallery: DataType }) => {
    const { id, thumb, title, category } = gallery

    return (
        <>
            <div className="gallery-style-one">
                <img src={`/assets/img/projects/${thumb}`} className='w-auto' alt="Image not Found" />
                <div className="overlay">
                    <p>{category}</p>
                    <h4><Link to={`/project-details/${id}`}>{title}</Link></h4>
                </div>
            </div>
        </>
    );
};

export default SingleGalleryV1;