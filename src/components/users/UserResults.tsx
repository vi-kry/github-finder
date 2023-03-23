import React from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import { useEffect, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserResults(): JSX.Element {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users!.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
