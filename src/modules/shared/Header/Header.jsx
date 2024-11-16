import { useLocation } from "react-router-dom";
import logoDash from "../../../assets/images/eating vegan food-rafiki.png"
import logoHeader from "../../../assets/images/category-logo.png";


export default function Header({ title, desc }) {
  const location = useLocation()
  return (
    <>
      <div className="header-container p-5 mx-2 d-flex align-items-center row">
        <div className="caption text-white col-md-6">
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
        <div className="logo-header col-md-6 text-end">
          <img className="img-fluid " src={location.pathname=="/dashboard" ? logoDash : logoHeader} alt="" />
        </div>
      </div>
    </>
  );
}
