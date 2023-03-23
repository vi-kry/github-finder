import { createContext, useState, Dispatch, SetStateAction } from "react";

interface User {
  login: string;
  avatar_url: string;
  id: number;
}

interface GithubContextInteface {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  fetchUsers: () => Promise<any>;
}

interface GithubProviderProps {
  children: React.ReactNode;
}

const GithubContext = createContext<GithubContextInteface>({
  users: [],
  setUsers: () => {},
  loading: false,
  setLoading: () => {},
  fetchUsers: async () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchUsers(): Promise<any> {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  }

  return (
    <GithubContext.Provider
      value={{ users, loading, fetchUsers, setUsers, setLoading }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
