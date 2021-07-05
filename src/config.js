const host = window.location.hostname;

export const appOrigin = process.env.JR_APP_ORIGIN || `http://${window.location.host}`;
export const apiOrigin = process.env.JRA_API_ORIGIN || `http://${host}:3001`;

export const appDomain = process.env.JRA_APP_DOMAIN || window.location.hostname;

export const tokenKey = process.env.JRA_TOKEN_KEY || "jra_access_token";
export const userKey = process.env.JRA_USER_KEY || "jra_user_details";
