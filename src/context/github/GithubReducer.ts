import { INITIAL_STATE, User } from "./GithubContext";

type ACTION_TYPES =
  | {
      type: "GET_USERS";
      payload: User[];
    }
  | { type: "SET_LOADING" }
  | { type: "CLEAR_USERS"; payload: [] };

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
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default githubReducer;
