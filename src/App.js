import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Home from "./components/Home";
import LinkPage from "./components/LinkPage";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

// if we use the ROLES object, be wary of the fact that this object can be dug up and you want your roles to not be seen by anyone for security

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

// using this object we can use object look up to get the value of each role e.g ROLES.User

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Routes we want to protect */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[5150]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
