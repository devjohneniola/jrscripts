import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Http, tryAgainMsg } from "../helpers";

const useLogin = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [sucMsg, setSucMsg] = useState("");

    const [email, setEmail] = useState("");
    const updateEmail = useCallback((e) => setEmail(e.target.value), []);

    const [password, setPassword] = useState("");
    const updatePassword = useCallback((e) => setPassword(e.target.value), []);

    const [rememberMe, setRememberMe] = useState(false);
    const updateRememberMe = useCallback((e) => setRememberMe(e.target.checked), []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(false);
        setErrMsg("");
        setSucMsg("");

        if (!email) return setErrMsg("Email was not entered");
        if (!password) return setErrMsg("Password was not entered");

        setIsLoading(true);

        const req = Http().secureRequest({
            url: "/users/sign-in",
            method: "POST",
            body: { user_id: email, password, keep_signed_in: rememberMe },
            successCallback({ status, error }) {
                if (status !== true) return setErrMsg(error || "Error logging you in");

                setSucMsg("Login successful!");
                const timer = setTimeout(() => {
                    navigate("/");
                    clearTimeout(timer);
                }, 1500);
            },
            errorCallback: () => setErrMsg("Unable to log you in. " + tryAgainMsg()),
        });

        req.finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        setIsLoading,
        errMsg,
        setErrMsg,
        sucMsg,
        setSucMsg,
        email,
        setEmail,
        updateEmail,
        password,
        setPassword,
        updatePassword,
        rememberMe,
        setRememberMe,
        updateRememberMe,
        handleSubmit,
    };
};

export default useLogin;
