import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import SidBar from "../shared/Sidebar/SidBar";

// eslint-disable-next-line react/prop-types
export default function MasterLayout({loginData}) {
  
  return (
    <div className="d-flex">
        <div className=""><SidBar/>
        </div>
        <div className="w-100">
            <NavBar loginData={loginData}/>
            <Outlet/>
        </div>
    </div>
  )
}
