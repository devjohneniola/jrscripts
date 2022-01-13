import React, { useEffect } from "react";
import { CssBaseline, Paper, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Header from "../../components/Header";
import LoginForm from "../../forms/Login";

import { appName } from "../../app-details";

import formImg from "../../assets/leaves.png";

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

const Login = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = `Login | ${appName}`;
    }, []);

    return (
        <React.Fragment>
            <Header />
            <CssBaseline />

            <Grid container component="main" className={classes.root}>
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
                        <LoginForm />
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Login.displayName = "Login";

export default Login;
