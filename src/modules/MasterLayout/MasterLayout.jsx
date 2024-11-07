import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import NavBar from "../shared/NavBar/NavBar";

export default function MasterLayout() {
  return (
    <div className="d-flex">
        <div className="w-25 bg-info">SidBar</div>
        <div className="w-100">
            <NavBar/>
            <Header/>
            <Outlet/>
        </div>
    </div>
  )
}
