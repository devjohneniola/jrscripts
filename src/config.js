const { hostname, host } = window.location;

export const appOrigin = process.env.JR_APP_ORIGIN || `http://${host}`;
export const apiOrigin = process.env.JRA_API_ORIGIN || `http://${hostname}:3001`;
export const wsOrigin = process.env.JRA_WS_ORIGIN || `ws://${hostname}:3002`;

export const appDomain = process.env.JRA_APP_DOMAIN || hostname;

export const tokenKey = process.env.JRA_TOKEN_KEY || "jra_access_token";
export const userKey = process.env.JRA_USER_KEY || "jra_user_details";
