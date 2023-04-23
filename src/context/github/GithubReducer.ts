import { INITIAL_STATE, User, Repo } from "./GithubContext";

type ACTION_TYPES =
  | {
      type: "GET_USERS";
      payload: User[];
    }
  | { type: "SET_LOADING" }
  | { type: "CLEAR_USERS" }
  | { type: "GET_USER"; payload: User }
  | { type: "GET_REPOS"; payload: Repo[] };

const githubReducer = (
  state: typeof INITIAL_STATE,
  action: ACTION_TYPES
): typeof INITIAL_STATE => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "GET_REPOS":
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export default githubReducer;
