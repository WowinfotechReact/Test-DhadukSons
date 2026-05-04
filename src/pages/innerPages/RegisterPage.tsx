import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import RegisterContent from "../../components/register/Gallery";

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Register</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title="Gallery" breadCrumb="Gallery" />
                <div className="row">
                 <div className="sidebar col-xl-12 col-lg-5 col-md-12 mt-md-100 mt-xs-50">
                                <aside>
                <RegisterContent />
                </aside>
                </div>
                </div>
            </LayoutV1>
        </>
    );
};

export default RegisterPage;