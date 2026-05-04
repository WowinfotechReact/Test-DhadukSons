interface DataType {
    icon?: string;
    title?: string;
    description?: string;
}

const AboutV1List = ({ list }: { list: DataType }) => {
    const { icon, title, description } = list;

    return (
        <li>
            <div className="icon">
                <img src={`/assets/img/icon/${icon}`} alt="Image Not Found" className="w-auto" />
            </div>
            <div className="info">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </li>
    );
};

export default AboutV1List;
