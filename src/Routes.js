import React from "react";
// import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter /* Redirect */ } from "react-router-dom";
// import { userID } from "./helpers";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

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

// var RouteWithAuth = (props) => {
//     if (userID) return <Route {...props} />;
//     return <Redirect to="/" />;
// };

// RouteWithAuth.displayName = "Route With Auth";
