import React from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import { useEffect, useState } from "react";

interface User {
  login: string;
  avatar_url: string;
  id: number;
}

function UserResults(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(): Promise<any> {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  }

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
