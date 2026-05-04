import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import GalleryV2 from "../../components/gallery/GalleryV2";
import LayoutV1 from "../../components/layouts/LayoutV1";

const ProjectPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Project</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title='Recent Projects' breadCrumb='Project' />
                <GalleryV2 />
            </LayoutV1>
        </>
    );
};

export default ProjectPage;