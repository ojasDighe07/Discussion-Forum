import { createContext, useEffect, useReducer } from "react";
import Reducer from "./CommentReducer";

const INITIAL_STATE = {
  comments: JSON.parse(localStorage.getItem("forumComments")) || null,
  isFetching: false,
  error: false,
};

export const CommentsContext = createContext(INITIAL_STATE);

export const CommentsContextProvider = ({ children }) => {
  const [state, dispatchComments] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("forumComments", JSON.stringify(state.comments));
  }, [state.comments]);

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        isFetching: state.isFetching,
        error: state.error,
        dispatchComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};


