import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

import LogoutButton from "./LogoutButton";
import LinkButton from "../LinkButton";

import GlobalContext from "../../contexts";
import { appName } from "../../app-details";

const Header = () => {
    const { userDetails } = useContext(GlobalContext);
    const isSignedIn = userDetails && userDetails.email;

    return (
        <AppBar color="header" position="static" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ fontFamily: '"Asley Marie"', flexGrow: 1 }}>
                    <NavLink style={{ textDecoration: "none", color: "inherit" }} to="/">
                        {appName}
                    </NavLink>
                </Typography>
                {isSignedIn && (
                    <div>
                        <LinkButton size="small" color="inherit" href="/subscriptions">
                            Subscriptions
                        </LinkButton>
                        <LinkButton size="small" color="inherit" href="/settings">
                            Settings
                        </LinkButton>
                        <LogoutButton size="small" color="inherit">
                            Logout
                        </LogoutButton>
                    </div>
                )}
                {!isSignedIn && (
                    <div>
                        <LinkButton size="small" color="inherit" href="/login">
                            Sign In
                        </LinkButton>
                        <LinkButton size="small" color="inherit" href="/login">
                            Sign Up
                        </LinkButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

Header.displayName = "Header";

export default Header;
