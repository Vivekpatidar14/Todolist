import React, { useState, useEffect } from "react";
import "./Sidebars.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  AiOutlineDashboard,
  AiFillProject,
  AiFillCodepenSquare,
  AiFillPicture,
  AiFillSetting,
} from "react-icons/ai";
import { GiVacuumCleaner } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserPlus, FaBloggerB, FaSearchengin, FaUsers } from "react-icons/fa";
import { BsFillPersonLinesFill, BsImages, BsInfoLg } from "react-icons/bs";
import {
  MdMarkEmailUnread,
  MdMiscellaneousServices,
  MdAdminPanelSettings,
} from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { FaTasks } from 'react-icons/fa';

const SidebarPannel = () => {
  const adminType = localStorage.getItem("adminType");

  const [bookingCount, setBookingCount] = useState("");
  const [enquiryCount, setEnquiryCount] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div
        className="_bg_"
        style={{
          display: "flex",
          height: "100%",
          position: "fixed",
          overflow: "hidden",
        }}
      >
        <Sidebar collapsedWidth="0px">
          <Menu>
            <MenuItem
              active={window.location.hash == "#/"}
              icon={<AiOutlineDashboard />}
              onClick={() => navigate("/")}
            >
              <NavLink
                end
                className="navbartext"
                activeClassName="active"
                to="/"
              >
                Dashboard
              </NavLink>
            </MenuItem>

            <MenuItem
                         active={window.location.hash == "#/subadmin"}
                         icon={<TbUsers />}
                         onClick={() => navigate("/users")}
                       >
                         <NavLink
                           end
                           className="navbartext"
                           activeClassName="active"
                           to="/users"
                         >
                          Users
                         </NavLink>
                       </MenuItem>
           
            <MenuItem
              active={window.location.hash == "#/Mytask"}
              icon={<FaTasks />}
              onClick={() => navigate("/Mytask")}
            >
              <NavLink
                end
                className="navbartext"
                activeClassName="active"
                to="/Mytask"
              >
                MyTask
              </NavLink>
            </MenuItem>

            <MenuItem
              active={window.location.hash == "#/tasks"}
              icon={<FaTasks />}
              onClick={() => navigate("/tasks")}
            >
              <NavLink
                end
                className="navbartext"
                activeClassName="active"
                to="/tasks"
              >
                Tasks
              </NavLink>
            </MenuItem>

            <MenuItem
              active={window.location.hash == "#/subtasks"}
              icon={<FaTasks />}
              onClick={() => navigate("/subtasks")}
            >
              <NavLink
                end
                className="navbartext"
                activeClassName="active"
                to="/subtasks"
              >
                Sub-Tasks
              </NavLink>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};
export default SidebarPannel;
