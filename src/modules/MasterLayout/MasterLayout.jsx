import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import SidBar from "../shared/Sidebar/SidBar";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MasterLayout({loginData,setLoginData}) {
  const [isAuth, setIsAith] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <>
     {isAuth && (
        <div className="d-flex">
        <div  className=""><SidBar setLoginData={setLoginData}/>
        </div>
        <div className="w-100">
            <NavBar loginData={loginData}/>
            <Outlet/>
        </div>
    </div>
     )}
    </>
  
  )
}
