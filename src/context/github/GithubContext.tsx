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
  searchUsers: (text: string) => Promise<any>;
}

interface GithubProviderProps {
  children: React.ReactNode;
}

export const INITIAL_STATE: GithubContextInteface = {
  users: [],
  loading: false,
  searchUsers: async () => {},
};

const GithubContext = createContext<GithubContextInteface>(INITIAL_STATE);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(githubReducer, INITIAL_STATE);

  //Get search results
  async function searchUsers(text: string): Promise<any> {
    const params = new URLSearchParams({
      q: text,
    });
    setLoading();
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  }

  // Set loading
  const setLoading = (): void => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, searchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
