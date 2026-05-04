import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";

const TermsAndConditionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.</title>
      </Helmet>

      <LayoutV1>
        <BreadCrumb
          title="Terms and Conditions"
          breadCrumb="Terms-and-conditions"
        />
        <TermsAndConditions />
      </LayoutV1>
    </>
  );
};

export default TermsAndConditionsPage;
