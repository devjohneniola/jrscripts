import React from "react";
import { NavLink } from "react-router-dom";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
    Grid,
    InputAdornment,
    Avatar,
    CircularProgress,
} from "@material-ui/core";
import { MailOutline as MailOutlineIcon, Lock as LockIcon } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import useLogin from "../hooks/useLogin";
import googleIcon from "../assets/google.png";

const useStyles = makeStyles((theme) => ({
    typography: {
        color: "#F85F46",
        margin: theme.spacing(5, 0, 1, 0),
    },
    submitButton: {
        backgroundColor: "#F85F46",
        padding: theme.spacing(2, 0),
        margin: theme.spacing(2, 0),
        "&:hover": {
            backgroundColor: "#F85F46",
        },
    },
    check: {
        color: "#F85F46",
    },
    password: {
        color: "#F85F46",
        margin: theme.spacing(5, 0),
    },
}));

const LoginForm = () => {
    const classes = useStyles();

    const {
        isLoading,
        errMsg,
        sucMsg,
        email,
        updateEmail,
        password,
        updatePassword,
        rememberMe,
        updateRememberMe,
        handleSubmit,
    } = useLogin();

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {isLoading && (
                <Typography component="div" align="center">
                    <CircularProgress />
                </Typography>
            )}
            {errMsg && <Alert severity="error">{errMsg}</Alert>}
            {sucMsg && <Alert severity="success">{sucMsg}</Alert>}

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={updateEmail}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MailOutlineIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={updatePassword}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Grid
                container
                alignItems="center"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                className={classes.check}
                                checked={rememberMe}
                                onChange={updateRememberMe}
                            />
                        }
                        label="Remember me"
                    />
                </Grid>
                <Grid item>
                    <Typography>
                        <NavLink to="/forgot-password" className={classes.password}>
                            Forgot Password?
                        </NavLink>
                    </Typography>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
            >
                Sign In
            </Button>
            <Grid container justify="center">
                <Grid item>
                    <Typography variant="body1" color="initial">
                        Don&rsquo;t have an account?
                        <NavLink to="/register" className={classes.typography}>
                            Register
                        </NavLink>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: "50px" }}>
                <Button
                    variant="outlined"
                    color="default"
                    fullWidth
                    startIcon={<Avatar src={googleIcon} />}
                >
                    Sign in with Google
                </Button>
            </Grid>
        </form>
    );
};

LoginForm.displayName = "Login Form";

export default LoginForm;
