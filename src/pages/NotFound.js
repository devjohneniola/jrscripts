import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

import { appName } from "../app-details";

const NotFound = () => {
    useEffect(() => {
        document.title = `Not Found | ${appName}`;
    }, []);

    return <Typography variant="h3">Not Found</Typography>;
};

export default NotFound;
