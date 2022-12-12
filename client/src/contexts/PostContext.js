import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });

  // Get posts
  const getPosts = async () => {
    try {
      const resp = await axios.get(`${apiUrl}/posts`);
      if (resp.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: resp.data.posts,
        });
      } else {
        dispatch({ type: POSTS_LOADED_FAIL });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Post context data
  const postContextData = { postState, getPosts };

  // Return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
