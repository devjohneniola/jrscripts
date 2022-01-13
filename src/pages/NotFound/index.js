import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CssBaseline, Container, Typography } from "@mui/material";

import Header from "../../components/Header";

import { appName } from "../../app-details";

const NotFound = () => {
    useEffect(() => {
        document.title = `Not Found | ${appName}`;
    }, []);

    return (
        <React.Fragment>
            <Header />
            <CssBaseline />

            <Container sx={{ padding: 3 }}>
                <Typography align="center" variant="h4">
                    Not Found
                </Typography>

                <Typography>
                    The page you are looking for was not found. You can just go back{" "}
                    <NavLink title="Go Home" to="/">
                        Home
                    </NavLink>
                </Typography>
            </Container>
        </React.Fragment>
    );
};

NotFound.displayName = "Not Found";

export default NotFound;
