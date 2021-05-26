import { userKey } from "../config";

export const hasLocalStorage = () => window && "localStorage" in window;
export const getLocalStore = (key) => (hasLocalStorage() ? window.localStorage.getItem(key) : false);

const getUserDetails = () => {
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
    window.location.href = "/index.html";
};

let userID, isSuperUser;
export const userDetails = getUserDetails();
if (userDetails) {
    userID = userDetails.id;
    isSuperUser = userDetails.is_super_user;
}

export const mustBeSignedIn = () => {
    if (!userID) signOut();
};

export { userID, isSuperUser };
