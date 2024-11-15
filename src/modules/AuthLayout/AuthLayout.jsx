import { Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";
export default function AuthLayout() {
  return (
    <div>
        <div className="auth-container">
      <div className="container-fluid bg-ovelay">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-md-6 col-lg-4 bg-white px-5 py-2 rounded rounded-2">
            <div>
              <div className="logo-container text-center mb-2">
                <img className="w-75" src={logo} alt="" />
              </div>
        <Outlet/>
        </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
