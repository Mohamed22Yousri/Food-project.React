import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../../assets/images/3.png";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function SidBar() {

  const [toggle, setToggle] = useState(true);

  let collaps = () => {
    setToggle(!toggle)
  }
  return (
    <>
      <div className="container-sidbar">
        <Sidebar collapsed={toggle}>
          <Menu>
            <MenuItem
            onClick={collaps}
              className="my-5 ps-1 logo-menu-item"
              icon={<img src={logo} />}
            ></MenuItem>
           
            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
              >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<Link to="/dashboard/user-list" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-regular fa-calendar-days"></i>}
              component={<Link to="/dashboard/category-list" />}
            >
              Categories
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-receipt"></i>}
              component={<Link to="/dashboard/recipe-list" />}
            >
              Recipes
            </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-unlock"></i>}>
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
              component={<Link to="/login" />}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
        ;
      </div>
    </>
  );
}
