import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./Components/Main/Main";
import Login from "./Components/LogIn/Login";
import Signup from "./Components/Signup/Signup";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {user && <Route path="/main" element={<Main />} />}
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;

//  <Routes>
//    {user && <Route path="/" element={<Main />} />}
//    <Route path="/signup" element={<Signup />} />
//    <Route path="/login" element={<Login />} />
//    <Route path="/" element={<Navigate replace to="/login" />} />
//  </Routes>;
