import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

const LinkButton = ({ isExternal, isNewTab, href, ...props }) => {
    const history = useHistory();
    const handleNavigate = useCallback(() => {
        if (isExternal)
            if (isNewTab) window.open(href);
            else window.location.href = href;
        else history.push(href);
    }, [isExternal, isNewTab, history, href]);
    return <Button onClick={handleNavigate} {...props} />;
};

LinkButton.displayName = "Link Button";
LinkButton.propTypes = {
    isExternal: PropTypes.bool,
    isNewTab: PropTypes.bool,
    href: PropTypes.string.isRequired,
};
LinkButton.defaultProps = { isExternal: false, isNewTab: false };

export default LinkButton;
