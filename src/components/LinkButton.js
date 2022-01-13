import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LinkButton = ({ isExternal, isNewTab, href, ...props }) => {
    const navigate = useNavigate();
    const handleNavigate = useCallback(() => {
        if (isExternal)
            if (isNewTab) window.open(href);
            else window.location.href = href;
        else navigate(href);
    }, [isExternal, isNewTab, navigate, href]);
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
