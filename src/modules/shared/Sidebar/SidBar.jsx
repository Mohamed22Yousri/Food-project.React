import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../../assets/images/3.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import logoChange from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { AuthContext } from "../../context/Authcontext";
export default function SidBar({ props }) {
  let { setLoginData, loginData } = useContext(AuthContext);
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  const [isOldValid, setIsOldfValid] = useState(false);
  const [isNewValid, setIsNewValid] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  let collaps = () => {
    setToggle(!toggle);
  };
  const onSubmit = async (data) => {
    try {
      let res = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      localStorage.setItem("token", res.data.token);
      toast.success("Done");
      
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
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <div>
            <div className="text-center">
              <img src={logoChange} alt="" />
            </div>
            <div className="py-4 px-3">
              <h3>Change Your Password</h3>
              <p>Enter your details below</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3 px-5">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isOldValid ? "text" : "password"}
                  className="form-control"
                  placeholder="Old Password"
                  aria-describedby="basic-addon1"
                  {...register("oldPassword", {
                    required: "old Password Is Required",
                  })}
                />
                <button
                  onClick={() => setIsOldfValid((prev) => !prev)}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  className="input-group-text"
                  id="basic-addon1"
                >
                  <i
                    className={`fa ${isOldValid ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </button>
              </div>
              {errors.oldPassword && (
                <span className="text-danger px-5 mb-2 d-block">
                  {errors.oldPassword.message}
                </span>
              )}

              <div className="input-group mb-3 px-5">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isNewValid ? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  aria-describedby="basic-addon1"
                  {...register("newPassword", {
                    required: "New Password Is Required",
                  })}
                />
                <button
                  onClick={() => setIsNewValid((prev) => !prev)}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  className="input-group-text"
                  id="basic-addon1"
                >
                  <i
                    className={`fa ${isNewValid ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-danger px-5 mb-2 d-block">
                  {errors.newPassword.message}
                </span>
              )}
              <div className="input-group mb-3 px-5">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isConfirmValid ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm New Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...register("confirmNewPassword", {
                    required: "Confirm New Password Is Reqired",
                  })}
                />
                <button
                  onClick={() => setIsConfirmValid((prev) => !prev)}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  className="input-group-text"
                  id="basic-addon1"
                >
                  <i
                    className={`fa ${
                      isConfirmValid ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.confirmNewPassword && (
                <span className="text-danger px-5 mb-2 d-block">
                  {errors.confirmNewPassword.message}
                </span>
              )}
              <div className="text-center">
                <button
                  disabled={isSubmitting}
                  className="btn btn-success w-75 my-5 px-4"
                >
                  {isSubmitting ? "Changing ..." : "Change Paswword"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
