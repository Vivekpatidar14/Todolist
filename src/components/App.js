import "aos/dist/aos.css";
import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "../components/admin/components/Login/Login";
import Dashboard from "./admin/components/Pages/Dashboard";
import Profile from "./admin/components/Pages/Profile";
import "react-toastify/dist/ReactToastify.css";
import Users from "./admin/components/Pages/Users";
import Tasks from "./admin/components/Pages/Tasks";
import Subtasks from "./admin/components/Pages/Subtasks";
import AdminRoutes from "./admin/components/AdminRoutes";
import Mytask from "./admin/components/Pages/Mytask";


function App() {
  let auth = localStorage.getItem("adminEmail");

  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          {auth ? (
            <Route path="/" element={<AdminRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/subtasks" element={<Subtasks />} />
              <Route path="/Mytask" element={<Mytask/>} />
             
            
            </Route>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
