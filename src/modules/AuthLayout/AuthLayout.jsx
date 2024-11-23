import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
export default function AuthLayout() {
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("register");
  const [isAuth, setIsAith] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <div>
      {!isAuth && (
        <div
          className={`auth-container ${
            isRegisterPage ? "register-container" : ""
          }`}
        >
          <div className="container-fluid bg-ovelay">
            <div className="row vh-100 align-items-center justify-content-center">
              <div
                className={`col-md-6 col-lg-4 bg-white px-5 py-2 rounded rounded-2 ${
                  isRegisterPage ? "col-lg-8 col-md-10" : ""
                }`}
              >
                <div>
                  <div className="logo-container text-center mb-2">
                    <img
                      className={` ${
                        isRegisterPage ? "Register-logo" : "w-75"
                      }`}
                      src={logo}
                      alt=""
                    />
                  </div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
