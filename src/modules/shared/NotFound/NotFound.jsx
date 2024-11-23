import { Link } from "react-router-dom";
import logo from "../../../assets/images/Group.png";
import background from "../../../assets/images/notFound.png"
export default function NotFound() {
  return (
    <>
      <div className="container-fluid my-3">
        <img className="img-fluid" src={logo} alt="" />
        <div className="row">
          <div className="px-4 pt-5 col-md-5 col-sm-12">
            <h2>Oops.</h2>
            <h4 className="text-success">Page not Found</h4>
            <p style={{ maxWidth: "400px" }}>
              This Page doesn’t exist or was removed! We suggest you back to
              home.
            </p>
            <Link to="/dashboard" className="btn btn-success btn-lg">
            <span style={{ paddingRight:"8px"}}>  <svg
            style={{marginBottom:"2px"}}
                width="24"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.585938 6.15625C0.585938 6.41667 0.682292 6.64062 0.875 6.82812L6.00781 11.9531C6.10677 12.0521 6.21094 12.125 6.32031 12.1719C6.42969 12.2188 6.54167 12.2422 6.65625 12.2422C6.91667 12.2422 7.13021 12.1589 7.29688 11.9922C7.46354 11.8307 7.54688 11.6276 7.54688 11.3828C7.54688 11.2578 7.52083 11.1406 7.46875 11.0312C7.42188 10.9219 7.35677 10.8255 7.27344 10.7422L5.52344 8.97656L2.67188 6.35938L2.35938 6.89844L5.11719 7.0625L14.5078 7.0625C14.7786 7.0625 14.9974 6.97917 15.1641 6.8125C15.3359 6.64583 15.4219 6.42708 15.4219 6.15625C15.4219 5.89063 15.3359 5.67448 15.1641 5.50781C14.9974 5.34115 14.7786 5.25781 14.5078 5.25781L5.11719 5.25781L2.35938 5.42188L2.67188 5.95312L5.52344 3.34375L7.27344 1.57812C7.35677 1.49479 7.42188 1.39844 7.46875 1.28906C7.52083 1.17969 7.54688 1.0625 7.54688 0.9375C7.54688 0.692708 7.46354 0.489583 7.29688 0.328125C7.13021 0.161458 6.91667 0.078125 6.65625 0.078125C6.42188 0.078125 6.20833 0.171875 6.01563 0.359375L0.875 5.49219C0.682292 5.67448 0.585938 5.89583 0.585938 6.15625Z"
                  fill="white"
                />
              </svg></span>
              Back To Home
            </Link>
          </div>
           <div className="col-md-7 col-sm-12">
          <img className="w-100" src={background} alt="" />
        </div>
        </div>
       
      </div>
      
    </>
  );
}
