import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Http, tryAgainMsg } from "../helpers";

const useGetFetch = (props, fetch /*, changes */) => {
    if (typeof fetch === "undefined") fetch = true;

    const latestProps = useRef();
    useEffect(() => {
        latestProps.current = props;
    });

    const { errorMsg, noneMsg, fetchErrorMsg, fontSize } = latestProps;

    const [data, dispatchData] = useReducer((state, { type, msg, fontSize: fs }) => {
        switch (type) {
            case "loading":
                return (
                    <div
                        style={{
                            "font-size": fs || fontSize,
                        }}
                    >
                        {msg || <CircularProgress />}
                    </div>
                );
            case "none":
                return <Alert severity="error">{msg || noneMsg || "No content"}</Alert>;
            case "error":
                return <Alert severity="error">{msg || errorMsg || "Error getting resources"}</Alert>;
            case "fetch-error":
                return (
                    <Alert severity="error">{msg || (fetchErrorMsg || "Lookup error") + ". " + tryAgainMsg()}</Alert>
                );
            case "success":
            default:
                return msg;
        }
    }, <CircularProgress />);
    const setData = useCallback((msg, fontSize) => dispatchData({ type: "success", msg, fontSize }), []);
    const setLoading = useCallback((msg, fontSize) => dispatchData({ type: "loading", msg, fontSize }), []);
    const setNoContent = useCallback((msg, fontSize) => dispatchData({ type: "none", msg, fontSize }), []);
    const setError = useCallback((msg, fontSize) => dispatchData({ type: "error", msg, fontSize }), []);
    const setFetchError = useCallback((msg, fontSize) => dispatchData({ type: "fetch-error", msg, fontSize }), []);

    const { url } = props;
    useEffect(() => {
        const { fontSize, secure, ...xOtherProps } = latestProps.current;

        if (!fetch) return;

        let {
            successCallback = () => {},
            noContent = () => {},
            errorCallback = () => {},
            msgIndex,
            ...otherProps
        } = xOtherProps;

        const sucCbType = typeof successCallback;
        const noCntType = typeof noContent;
        const errCbType = typeof errorCallback;

        const badTypeErr = (par, type) => `Expecting a function as ${par}. ${type} was passed!`;

        if (sucCbType !== "function") {
            console.error(badTypeErr("successCallback", sucCbType));
            successCallback = () => {};
        }
        if (noCntType !== "function") {
            console.error(badTypeErr("noContent", noCntType));
            noContent = () => {};
        }
        if (errCbType !== "function") {
            console.error(badTypeErr("errorCallback", errCbType));
            errorCallback = () => {};
        }

        const requestData = {
            url,
            ...otherProps,
            successCallback(resp) {
                const { status, data: msg, error } = resp;
                dispatchData({
                    type: status === true ? "success" : "error",
                    msg: (status === true && msgIndex ? msg[msgIndex] : msg) || error,
                });
                successCallback(resp);
            },
            noContent() {
                dispatchData({ type: "none" });
                noContent();
            },
            errorCallback() {
                dispatchData({ type: "fetch-error" });
                errorCallback();
            },
        };

        const { abort, ...http } = Http();

        http[secure ? "secureRequest" : "makeReq"](requestData);

        // clean up
        return abort;
    }, [url, fetch, errorMsg, noneMsg, fetchErrorMsg]);

    return [data, setData, { setLoading, setNoContent, setError, setFetchError }];
};

export default useGetFetch;
