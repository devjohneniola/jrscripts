import React, { useState, useContext } from "react";
import { Button } from "@mui/material";

import GlobalContext from "../../contexts";
import { Http } from "../../helpers";

const LogoutButton = (props) => {
    const { setUserDetails } = useContext(GlobalContext);

    const [isLoading, setIsLoading] = useState(false);

    const logOut = () => {
        setIsLoading(true);
        const req = Http().secureRequest({
            url: "/users/logout",
            method: "DELETE",
            successCallback({ status }) {
                if (status === true) {
                    const timer = setTimeout(() => {
                        setUserDetails({});
                        window.location.reload();
                        clearTimeout(timer);
                    }, 1200);
                }
            },
        });
        req.finally(() => setIsLoading(false));
    };

    return <Button onClick={logOut} disabled={isLoading} {...props} />;
};

LogoutButton.displayName = "Logout Button";

export default LogoutButton;
