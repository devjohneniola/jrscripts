import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container, CssBaseline, Typography } from "@material-ui/core";

import { appName } from "../app-details";

export default function Home() {
    useEffect(() => {
        document.title = `Home | ${appName}`;
    }, []);

    return (
        <Container disableGutters maxWidth={false}>
            <CssBaseline />
            <Typography variant="h1">JRA</Typography>
            <Typography>
                <NavLink to="/login">Login</NavLink>
            </Typography>
        </Container>
    );
}

Home.displayName = "Home";
