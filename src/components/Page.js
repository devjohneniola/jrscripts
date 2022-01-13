import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Paper } from "@mui/material";

import { appName } from "../app-details";

const Page = ({ title, children, maxWidth, ...props }) => {
    useEffect(() => {
        if (document) document.title = `${title} | ${appName}`;
    }, [title]);

    return (
        <Container sx={{ minHeight: "100vh" }} component="main" {...{ maxWidth }} disableGutters>
            <Paper sx={{ padding: 3, maxWidth: 1000, boxShadow: "unset" }} {...props}>
                {children}
            </Paper>
        </Container>
    );
};

Page.displayName = "Page";
Page.propTypes = {
    children: PropTypes.node,
    maxWidth: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs", false]),
    title: PropTypes.string,
};
Page.defaultProps = { children: "", maxWidth: "md", title: "" };

export default Page;
