// Checking if the Client & Server is connected or not (First test)

import API from "../api/axios";

const Login = () => {
  const testBackend = async () => {
    const res = await API.get("/");
    alert(res.data);
  };

  return <button onClick={testBackend}>Test Backend</button>;
};

export default Login;
