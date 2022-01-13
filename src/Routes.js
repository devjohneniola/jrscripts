import React /*, { useContext }*/ from "react";
// import PropTypes from "prop-types";
import { Routes, Route, BrowserRouter /* Redirect */ } from "react-router-dom";

// import GlobalContext from "./contexts";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// const RouteWithAuth = ({ noVerificationNeeded, ...props }) => {
//     const { userDetails } = useContext(GlobalContext);
//     const { email, is_email_verified } = userDetails;
//     if (email) {
//         if (!noVerificationNeeded && !is_email_verified) return <Redirect to="/email-verify" />;
//         return <Route {...props} />;
//     }
//     return <Redirect to="/sign-in" />;
// };

// RouteWithAuth.displayName = "Route With Auth";
// RouteWithAuth.propTypes = { noVerificationNeeded: PropTypes.bool };
// RouteWithAuth.defaultProps = { noVerificationNeeded: false };

const RoutesComp = () => (
    <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ScrollToTop>
    </BrowserRouter>
);

RoutesComp.displayName = "Routes Comp";

export default RoutesComp;
