import { INITIAL_STATE, User } from "./GithubContext";

type ACTION_TYPES = {
  type: string;
  payload: User[];
};

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
    default:
      return state;
  }
};

export default githubReducer;
