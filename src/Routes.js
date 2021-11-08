import React /*, { useContext }*/ from "react";
// import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter /* Redirect */ } from "react-router-dom";

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

const Routes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
};

Routes.displayName = "Routes";

export default Routes;
