import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LoginContentAdmin from "./LoginContentAdmin";

const LoginPageAdmin = () => {
  return (
    <>
      <Helmet>
        <title>Dhaduk And Sons Farmer LLP.- Login</title>
      </Helmet>

      {/* <LayoutV1>
        <BreadCrumb title="Login to Admin Panel" breadCrumb="Admin Login" />
      </LayoutV1> */}
      <LoginContentAdmin />
    </>
  );
};

export default LoginPageAdmin;
