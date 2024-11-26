import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../../assets/images/3.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { AuthContext } from "../../context/Authcontext";
import ChangePassword from "../../ChangePassword/ChangePassword";
export default function SidBar({ props }) {
  let { setLoginData, loginData } = useContext(AuthContext);
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  let collaps = () => {
    setToggle(!toggle);
  };
  const onSubmit = async (data) => {
    try {
      let res = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      localStorage.setItem("token", res.data.token);
      toast.success("Change Password Is successfully");
      
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
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
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                icon={<i className="fa-solid fa-users"></i>}
                component={<Link to="/dashboard/user-list" />}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                icon={<i className="fa-regular fa-calendar-days"></i>}
                component={<Link to="/dashboard/category-list" />}
              >
                Categories
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa-solid fa-receipt"></i>}
              component={<Link to="/dashboard/recipe-list" />}
            >
              Recipes
            </MenuItem>
            {loginData?.userGroup == "SystemUser" ? (
              <MenuItem
                icon={<i className="fa-regular fa-heart"></i>}
                component={<Link to="/dashboard/Favoret-list" />}
              >
                Favorites
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              onClick={handleShow}
              icon={<i className="fa-solid fa-unlock"></i>}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
              component={
                <Link
                  onClick={() => {
                    localStorage.clear();
                    {
                      setLoginData(null);
                    }
                  }}
                  to="/login"
                />
              }
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
        ;
       
      </div>
      <ChangePassword show={show} handleClose={handleClose} onSubmit={onSubmit} props={props} />
    </>
  );
}
