export const isProduction = process.env.NODE_ENV === "production";

export const BASE_URL = "http://localhost:3000";

export const isServer = !process.browser;

export const LARAVEL_URL = "http://localhost:8000";
// export const LARAVEL_URL = "https://90430bee639f.ngrok.io";
// export const LARAVEL_URL = "http://localhost";
// export const LARAVEL_URL = "https://backend.test";

export const SUPPORTED_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const FAUNA_ADMIN_KEY = process.env.FUANA_ADMIN_KEY!;

export const uuidFormatRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

// ttl stands for time to live
export const ttl = 7260; // 7260 seconds = 121 minutes = 2 hours 1 minute

export const NEXT_IRON_SESSION_CONFIG = {
  cookieName: "grayscale",
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieOptions: {
    /*
      working
     */
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as "strict",
    // sameSite: "none" as "none",
    // The next line makes sure browser will expire cookies before seals are considered expired by the server. It also allows for clock difference of 60 seconds maximum between server and clients.
    maxAge: ttl - 60,
    path: "/",
    /*
     Not Working
     */
    // secure: true,
    // httpOnly: true,
    // sameSite: "strict",
    // maxAge: 60 * 60, // 2 hours
    // path: "/",
  },
};
