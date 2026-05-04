import { Link } from "react-router-dom";
import TagsWidgetData from "../../assets/jsonData/widgets/TagsWidgetData.json";
import handleSmoothScroll from '../utilities/handleSmoothScroll';

const TagsWidget = () => {
    return (
        <>
            <div className="sidebar-item tags">
                <h4 className="title">tags</h4>
                <div className="sidebar-info">
                    <ul>
                        {TagsWidgetData.map(data =>
                            <li key={data.id}><Link to="#" onClick={handleSmoothScroll}>{data.category}</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TagsWidget;