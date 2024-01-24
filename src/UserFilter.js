import React, { useEffect, useState } from "react";

const UserFilter = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const depdencices = selectedUser ? selectedUser : null;

  useEffect(() => {
    const fetchData = async () => {
      let url = selectedUser
        ? `https://jsonplaceholder.typicode.com/posts/${selectedUser}`
        : "https://jsonplaceholder.typicode.com/posts";

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPosts(data);
      } else if (typeof data === "object") {
        setUser([data]);
      }
    };

    fetchData();
  }, [depdencices]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      UserFilter
      <select onChange={(e) => setSelectedUser(parseInt(e.target.value))}>
        {posts.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id}
          </option>
        ))}
      </select>
      <div>{user.length > 0 && <p>{user[0].title}</p>}</div>
    </div>
  );
};

export default UserFilter;
