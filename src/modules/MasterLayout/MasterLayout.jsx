import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import SidBar from "../shared/Sidebar/SidBar";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MasterLayout() {
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
        <div  className=""><SidBar/>
        </div>
        <div className="w-100">
            <NavBar/>
            <Outlet/>
        </div>
    </div>
     )}
    </>
  
  )
}
