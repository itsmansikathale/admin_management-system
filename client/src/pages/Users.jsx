import { useState, useEffect } from "react";
import API from "../../src/api/axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((u) => {
          <li key={u._id}>
            {u.name} - {u.role}
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>;
        })}
      </ul>
    </>
  );
};

export default Users;
