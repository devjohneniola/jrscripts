import { apiOrigin } from "../config";
import { signOut } from "./auth";

const Http = () => {
    const controller = new window.AbortController();

    const makeReq = (data) => {
        const {
            method = "GET",
            credentials,
            onReady,
            noContent,
            successCallback,
            jsonError,
            errorCallback,
            requestType = "json",
            responseType,
            sessionCache,
            foreverCache,
            debug,
        } = data;

        let { headers, url, body } = data;

        const reqOptions = {
            method,
            credentials,
            signal: controller.signal,
        };

        if (method !== "GET" && requestType !== "multi") {
            let reqType;
            switch (requestType) {
                case "json":
                    reqType = "application/json";
                    break;
                default:
                    reqType = "application/x-www-form-urlencoded";
            }
            if (!headers) headers = {};
            headers = {
                ...headers,
                ...{ "Content-Type": reqType },
            };
        }

        if (requestType === "json" && body && typeof body === "object") body = JSON.stringify(body);

        if (body) reqOptions.body = body;
        if (headers) reqOptions.headers = headers;

        if (apiOrigin && !/^(https?:)?\/\//i.test(url))
            url = apiOrigin + (url.charAt(0) === "/" ? "" : "/") + url;

        const store = (foreverCache ? "local" : "session") + "Storage";

        const saveToStore = (data) => {
            if (!window || (!foreverCache && !sessionCache) || !(store in window)) return;
            window[store].setItem(url, JSON.stringify(data));
        };

        const isValidErrorCallback = typeof errorCallback === "function";
        const isValidSuccessCallback = typeof successCallback === "function";

        const reportError = (err, noTalk) => {
            if (isValidErrorCallback) errorCallback(err);
            if (!noTalk && debug) console.error(err);
        };

        const fetchNow = ({ json: cacheJson, status: cacheStatus }) =>
            cacheJson && cacheStatus
                ? (() => {
                      if (isValidSuccessCallback) successCallback(cacheJson, cacheStatus);
                  })()
                : fetch(url, reqOptions)
                      .then((res) => {
                          try {
                              const resp = res.clone();

                              const { security = false, insecure = false } =
                                  typeof onReady === "function" ? onReady(resp) : {};

                              const { status } = resp;

                              resp[responseType === "text" ? "text" : "json"]()
                                  .then((json) => {
                                      saveToStore({ json, status });
                                      if (isValidSuccessCallback)
                                          successCallback(json, status, security, insecure);
                                      else if (debug)
                                          console.error(
                                              "Success callback passed was not a function",
                                          );
                                  })
                                  .catch((err) => {
                                      if (status === 204) {
                                          if (typeof noContent === "function") noContent();
                                          else reportError(err);
                                          return;
                                      }
                                      if (typeof jsonError === "function") jsonError(status, err);
                                      else reportError(err, true);
                                      if (!debug) return;
                                      console.error("Error", err);
                                      console.error("Unusual json error while fetching data", data);
                                  });
                          } catch (err) {
                              reportError(err);
                          }
                      })
                      .catch((err) => reportError(err));

        if (!window || (!foreverCache && !sessionCache) || !(store in window)) return fetchNow({});
        try {
            return fetchNow(JSON.parse(window[store].getItem(url)) || {});
        } catch (err) {
            return fetchNow({});
        }
    };

    const secureRequest = (data) =>
        makeReq({
            ...data,
            credentials: "include",
            onReady(resp) {
                const { status } = resp;
                let security = {};
                let insecure = false;
                if (status === 401) {
                    signOut();
                    security = { ...security, loggedOut: true };
                }
                if (status === 403) security = { ...security, accessDenied: true };
                if (status === 401 || status === 403) insecure = true;

                return { security, insecure };
            },
        });

    const abort = () => {
        try {
            controller.abort();
        } catch (err) {
            /* sjd */
        }
    };

    return { makeReq, secureRequest, abort };
};

export const Https = () => {
    const { secureRequest, ...http } = Http();
    return { secureRequest, makeReq: secureRequest, ...http };
};

export const tryAgainMsg = () =>
    "Please try again in a few minutes time" +
    (window && window.navigator && window.navigator.onLine === false
        ? ". Be sure to have internet connection"
        : "");

export default Http;
