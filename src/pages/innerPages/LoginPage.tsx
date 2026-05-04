import { Helmet } from "react-helmet-async";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import LoginContent from "../../components/register/LoginContent";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Dhaduk And Sons Farmer LLP.- Login</title>
            </Helmet>

            <LayoutV1>
                <BreadCrumb title='Login Page' breadCrumb='login' />
                <LoginContent />
            </LayoutV1>
        </>
    );
};

export default LoginPage;