import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useEffect(() => window.scrollTo(0, 0), [location.pathname]);
    return children;
};

ScrollToTop.displayName = "Scroll To Top";
ScrollToTop.propTypes = { ScrollToTop: PropTypes.any };
ScrollToTop.defaultProps = { children: "" };

export default ScrollToTop;
