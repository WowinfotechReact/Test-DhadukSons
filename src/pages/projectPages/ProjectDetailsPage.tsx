import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectDetailsContent from "../../components/project/ProjectDetailsContent";
import GalleryV2Data from '../../assets/jsonData/gallery/GalleryV2Data.json';
import { useParams } from "react-router-dom";

const ProjectDetailsPage = () => {

    const { id } = useParams();
    const data = GalleryV2Data.find(team => team.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Project Details</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Organic Healthy Food" breadCrumb="Project-Details" />
                {data && <ProjectDetailsContent projectInfo={data} />}
            </LayoutV1>
        </>
    );
};

export default ProjectDetailsPage;