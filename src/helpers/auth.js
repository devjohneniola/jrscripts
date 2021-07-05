import { userKey } from "../config";

export const hasLocalStorage = () => window && "localStorage" in window;
export const getLocalStore = (key) =>
    hasLocalStorage() ? window.localStorage.getItem(key) : false;

export const saveToLocalStore = (key, data) =>
    hasLocalStorage() ? window.localStorage.setItem(key, JSON.stringify(data)) : false;

export const getUserDetails = () => {
    try {
        return JSON.parse(getLocalStore(userKey));
    } catch (err) {
        return false;
    }
};

export const saveUserDetails = (data) => {
    if (!hasLocalStorage() || !data || typeof data !== "object") return false;
    window.localStorage.setItem(userKey, JSON.stringify(data));
};

export const signOut = () => {
    if (!hasLocalStorage()) return;
    window.localStorage.setItem(userKey, "");
    window.location.href = "/";
};

export const userDetails = getUserDetails();
const { id: userID, is_super_user: isSuperUser } = userDetails || {};

export const mustBeSignedIn = () => {
    if (!userID) signOut();
};

export { userID, isSuperUser };
