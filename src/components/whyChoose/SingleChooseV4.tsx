interface DataType {
  id?: number;
  icon?: string;
  alt: string;
  title?: string;
  description?: string;
}

const SingleChooseV4 = ({ list }: { list: DataType }) => {
  const { icon, alt, title, description } = list;

  return (
    <li>
      <div className="icon">
        <img src={`/assets/img/icon/${icon}`} alt={alt} />
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default SingleChooseV4;
