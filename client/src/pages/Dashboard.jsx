import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout, user } = useAuth();

  const testAdmin = async () => {
    try {
      const res = await API.get("/api/admin");
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "API failed");
    }
  };

  return (
    <>
      <h2>Welcome {user?.email}</h2>
      <button onClick={testAdmin}>Test Admin API</button>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
