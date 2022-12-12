export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3030/api"
    : "somedeployedURL";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
