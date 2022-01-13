import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CssBaseline, Container, Typography } from "@mui/material";

import Header from "../../components/Header";

import { appName } from "../../app-details";

const Home = () => {
    useEffect(() => {
        document.title = `Home | ${appName}`;
    }, []);

    return (
        <React.Fragment>
            <Header />
            <CssBaseline />

            <Container sx={{ padding: 3 }}>
                <CssBaseline />
                <Typography align="center" variant="h4">
                    {appName}
                </Typography>
                <Typography>
                    <NavLink to="/login">Login</NavLink>
                </Typography>
            </Container>
        </React.Fragment>
    );
};

Home.displayName = "Home";

export default Home;
