import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

const DisclaimerPage = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb title="Disclaimer" breadCrumb="Disclaimer" />
        <Disclaimer />
      </LayoutV1>
    </>
  );
};

export default DisclaimerPage;
