const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//Get search results
export async function searchUsers(text: string): Promise<any> {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items } = await response.json();

  return items;
}

//Get single user
export async function getUser(login: string): Promise<any> {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    window.location.href = "/notfound";
  } else {
    const data = await response.json();

    return data;
  }
}

//Get user repos
export async function getUserRepos(login: string): Promise<any> {
  const params = new URLSearchParams({
    sort: "created",
    per_page: "10",
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const data = await response.json();

  return data;
}
