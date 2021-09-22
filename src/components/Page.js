import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { appName } from "../app-details";

const useStyles = makeStyles((theme) => ({
    container: { minHeight: "100vh" },
    paper: {
        padding: theme.spacing(3),
        maxWidth: 1000,
        boxShadow: "unset",
    },
    middleText: { padding: theme.spacing(2, 1) },
}));

const Page = ({ title, children, maxWidth, ...props }) => {
    const classes = useStyles();

    useEffect(() => {
        if (document) document.title = `${title} | ${appName}`;
    }, [title]);

    return (
        <Container className={classes.container} component="main" {...{ maxWidth }} disableGutters>
            <Paper className={classes.paper} {...props}>
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
