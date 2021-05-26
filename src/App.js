import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import GlobalContext from "./contexts";

import Routes from "./Routes";

// fonts
import "@fontsource/roboto";

import { userKey } from "./config";

const theme = createMuiTheme({
    palette: { info: { main: blue[700] } },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['"Open Sans"', "Roboto", "sans-serif"].join(","),
    },
});

const App = () => {
    const [isSignedOut, setIsSignedOut] = useState(false);
    const toggleIsSignedOut = useCallback(() => setIsSignedOut((x) => !x), []);

    useEffect(() => {
        if (isSignedOut !== true) return;
        setIsBusy(true);
        window.localStorage.setItem(userKey, "");
        setTimeout(() => {
            setIsBusy(false);
            window.location.reload();
        }, 1500);
    }, [isSignedOut]);

    return (
        <ThemeProvider {...{ theme }}>
            <GlobalContext.Provider value={{ isSignedOut, toggleIsSignedOut }}>
                <Routes />
            </GlobalContext.Provider>
        </ThemeProvider>
    );
};

export default App;