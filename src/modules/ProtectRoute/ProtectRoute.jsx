import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/Authcontext";

// eslint-disable-next-line react/prop-types
export default function ProtectRoute({ children}) {
 let {loginData} = useContext(AuthContext)
    if(localStorage.getItem("token") || loginData) return children;
    else return <Navigate to='/login'/>
}
