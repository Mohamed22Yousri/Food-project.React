import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';


const LogIn = () => {

    let {register, formState:{errors}, handleSubmit} = useForm()
    let navgigate = useNavigate()
    const onSubmit = async (data) => {
      try {
        await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login", data)
        toast.success("Login is successsfully")
        navgigate('/dashboard')
        
        
      } catch (error) {
        toast.error(error.response.data.message)
        
      }      
    }
  return (
    <div className="auth-container">
      <div className="container-fluid bg-ovelay">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-md-6 col-lg-4 bg-white px-5 py-2 rounded rounded-2">
            <div>
              <div className="logo-container text-center mb-2">
                <img className="w-75" src={logo} alt="" />
              </div>
              <div className="title mb-4">
                <h3 className="h5">Login</h3>
                <span className="text-muted">
                  Welcome Back! Please enter your details
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your E-mail"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...register("email", {
                      required:"Email Is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email is not valid"
                      }
                    })
                    }
                  />
                </div>
                  {errors.email && <span className="text-danger px-2 mb-2 d-block">{errors.email.message}</span>}
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control "
                    placeholder="Password"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...register("password", {
                      required:"password Is Required",
                    
                    })
                    }                  
                  />
                </div>
                {errors.password && <span className="text-danger px-2 mb-2 d-block">{errors.password.message}</span>}
                <div className="links d-flex justify-content-between">
                  <Link
                    to="/register"
                    className="text-muted text-decoration-none"
                  >
                    Register Now?
                  </Link>
                  <Link
                    to="/forget-pass"
                    className="text-success text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div>
                  <button className="btn btn-success w-100 my-3">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
