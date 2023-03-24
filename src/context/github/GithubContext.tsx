import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

export interface User {
  login: string;
  avatar_url: string;
  id: number;
}

export interface GithubContextInteface {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<any>;
}

interface GithubProviderProps {
  children: React.ReactNode;
}

export const INITIAL_STATE: GithubContextInteface = {
  users: [],
  loading: false,
  fetchUsers: async () => {},
};

const GithubContext = createContext<GithubContextInteface>(INITIAL_STATE);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(githubReducer, INITIAL_STATE);

  //Get initial users (testing purposes)
  async function fetchUsers(): Promise<any> {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  }

  // Set loading
  const setLoading = (): void => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
