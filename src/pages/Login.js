import React, { useEffect } from "react";
import { CssBaseline, Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Login } from "../forms";

import formImg from "../assets/leaves.png";

import { appName } from "../app-details";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${formImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    typography: {
        color: "#F85F46",
        margin: theme.spacing(5, 0, 1, 0),
    },
    bodyText: {
        color: "#A9A9A9",
        margin: theme.spacing(0, 0, 3, 0),
    },
    paper: {
        margin: theme.spacing(8, 4),
    },
}));

export default function SignInSide() {
    const classes = useStyles();

    useEffect(() => {
        document.title = `Login | ${appName}`;
    }, []);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4" className={classes.typography}>
                        Login
                    </Typography>
                    <Typography variant="body1" className={classes.bodyText}>
                        Welcome back! Login with your credentials that you entered during
                        registration
                    </Typography>
                    <Login />
                </div>
            </Grid>
        </Grid>
    );
}

SignInSide.displayName = "Login";
