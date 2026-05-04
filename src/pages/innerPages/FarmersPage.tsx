import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamV3 from "../../components/team/TeamV3";

const FarmersPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Farmers</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Farm Members" breadCrumb="Farmers" />
                <TeamV3 />
            </LayoutV1>
        </>
    );
};

export default FarmersPage;