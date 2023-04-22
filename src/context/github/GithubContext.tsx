import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: any[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: Permissions;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Permissions {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
}

export interface User {
  login: string;
  avatar_url: string;
  id: number;
  name: string;
  type: string;
  location: string;
  bio: string;
  blog: string;
  twitter_username: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  hireable: boolean | null;
}

export interface GithubContextInterface {
  users: User[];
  user: User;
  loading: boolean;
  repos: Repo[];
  dispatch: React.Dispatch<any>;
  searchUsers: (text: string) => Promise<any>;
  getUser: (login: string) => Promise<any>;
  getUserRepos: (login: string) => Promise<any>;
  clearUsers: () => void;
}

interface GithubProviderProps {
  children: React.ReactNode;
}

export const INITIAL_STATE: GithubContextInterface = {
  users: [],
  user: {
    login: "",
    avatar_url: "",
    id: 0,
    name: "",
    type: "",
    location: "",
    bio: "",
    blog: "",
    twitter_username: null,
    html_url: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    public_gists: 0,
    hireable: null,
  },
  loading: false,
  repos: [],
  dispatch: () => null,
  searchUsers: async () => {},
  getUser: async () => {},
  getUserRepos: async () => {},
  clearUsers: () => {},
};

const GithubContext = createContext<GithubContextInterface>(INITIAL_STATE);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(githubReducer, INITIAL_STATE);

  //Get single user
  async function getUser(login: string): Promise<any> {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location.href = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  }

  //Get user repos
  async function getUserRepos(login: string): Promise<any> {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: "10",
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  }

  // Clear users from state
  const clearUsers = (): void =>
    dispatch({
      type: "CLEAR_USERS",
      payload: [],
    });

  // Set loading
  const setLoading = (): void => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
