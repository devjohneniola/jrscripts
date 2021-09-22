import { hot } from "react-hot-loader/root";
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red, green } from "@mui/material/colors";
// import { useMediaQuery } from "@mui/material";

import GlobalContext from "./contexts";

import Routes from "./Routes";

// fonts
import "@fontsource/roboto";

import { userKey } from "./config";

// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
const theme = createTheme({
    palette: {
        // mode: prefersDarkMode ? "dark" : "light",
        default: { main: "#010101", contrastText: "#fff" },
        header: { main: "#364068", contrastText: "#fff" },
        footer: { main: "#131419", contrastText: "#fff" },
        primary: { main: blue[700] },
        secondary: { main: red[700] },
        gold: { main: "#975122", contrastText: "#fff" },
        green: { main: green[700], contrastText: "#fff" },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: 'Roboto, "Open Sans", "sans-serif"',
    },
});

const App = () => {
    const [userDetails, setUserDetails] = useState(() => {
        try {
            return JSON.parse(window.localStorage.getItem(userKey));
        } catch (e) {
            return {};
        }
    });
    const updateUserDetails = useCallback((obj) => setUserDetails((x) => ({ ...x, ...obj })), []);

    useEffect(() => {
        window.localStorage.setItem(userKey, JSON.stringify(userDetails));

        const { sessionValidTill } = userDetails || {};
        const maxAgeMs = sessionValidTill - new Date() * 1;
        if (maxAgeMs && new Date(new Date() * 1 + maxAgeMs) * 1 - new Date() * 1 < 1)
            setUserDetails({});

        if (!maxAgeMs || maxAgeMs < 1) return;

        const timer = setTimeout(() => setUserDetails({}), maxAgeMs);

        return () => clearTimeout(timer);
    }, [userDetails]);

    return (
        <ThemeProvider {...{ theme }}>
            <GlobalContext.Provider value={{ userDetails, setUserDetails, updateUserDetails }}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </GlobalContext.Provider>
        </ThemeProvider>
    );
};

export default hot(App);
