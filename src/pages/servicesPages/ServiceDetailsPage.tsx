import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceDetailsContent from "../../components/services/ServiceDetailsContent";
import { useParams } from "react-router-dom";
import ServiceV2Data from '../../assets/jsonData/services/ServiceV2Data.json';
import { Helmet } from "react-helmet-async";

const ServiceDetailsPage = () => {

    const { id } = useParams();
    const data = ServiceV2Data.find(service => service.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Service Details</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Service Details" breadCrumb="service-details" />
                {data && <ServiceDetailsContent serviceInfo={data} />}
            </LayoutV1>
        </>
    );
};

export default ServiceDetailsPage;