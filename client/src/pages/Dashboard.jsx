import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout, user } = useAuth();

  const testAdminAPI = async () => {
    try {
      const res = await API.get("/admin/test");
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "API failed");
    }
  };

  return (
    <>
      <h2>Welcome {user?.email}</h2>

      {/* this will show button only to the Admin */}
      {user?.role === "admin" && (
        <button onClick={testAdminAPI}>Test Admin API</button>
      )}
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
