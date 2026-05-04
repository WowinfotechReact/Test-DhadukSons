import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamV2Data from '../../assets/jsonData/team/TeamV2Data.json';
import FarmerDetailsContent from "../../components/team/FarmerDetailsContent";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";


const FarmerDetailsPage = () => {

    const { id } = useParams();
    const data = TeamV2Data.find(team => team.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Farmer Details</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title='Team Details' breadCrumb='farmer-details' />
                {data && <FarmerDetailsContent teamInfo={data} />}
            </LayoutV1>
        </>
    );
};

export default FarmerDetailsPage;