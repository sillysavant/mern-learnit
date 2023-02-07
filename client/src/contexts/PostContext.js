import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);

  const [showToast, setShowToast] = useState({
    show: true,
    message: "",
    type: null,
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

  // Add post
  const addPost = async (postForm) => {
    try {
      const resp = await axios.post(`${apiUrl}/posts`, postForm);
      if (resp.data.success) {
        dispatch({
          type: ADD_POST,
          payload: resp.data.post,
        });
      }
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Delete posts
  const deletePost = async (postId) => {
    try {
      const resp = await axios.delete(`${apiUrl}/posts/${postId}`);

      if (resp.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Post context data
  const postContextData = {
    postState,
    showAddPostModal,
    showToast,
    setShowAddPostModal,
    getPosts,
    addPost,
    setShowToast,
    deletePost,
  };

  // Return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
