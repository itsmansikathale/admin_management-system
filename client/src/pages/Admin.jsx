import { useState, useEffect } from "react";
import API from "../api/axios";
// import user from "../../../server/models/user";

const Admin = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  //   fetching admin test message
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // 1. testing route
        const res = await API.get("/admin/test");
        setMessage(res.data.message);

        // 2.Fetcing all users (admin-only)

        const usersRes = await API.get("/users");
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Error fetching data");
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{message}</p>

      <h2>All Users</h2>

      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Admin;
