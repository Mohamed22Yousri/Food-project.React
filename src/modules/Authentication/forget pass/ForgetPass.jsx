import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

export default function ForgetPass() {
  let navigate = useNavigate()
  let {register, formState:{errors} , handleSubmit } = useForm();
  const onSubmit = (data) => {
    try {
      axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data)
      navigate("/reset-pass")
      toast.success("Email is successsfully")
    } catch (error) {
      console.log(error.response.data.message);

      
    }
  
  }
  return (
    <>
   
              <div className="title mb-4">
                <h3 className="h6">Forgot Your Password?</h3>
                <span className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
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
                    placeholder="Enter Your Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...register("email",{
                      required:"Email is required",
                      pattern:{
                        value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email is not valid"
                      }
                    })}
                  />
                </div>
                {errors.email&& <span className="text-danger">{errors.email.message}</span>}
                <div>
                  <button className="btn btn-success w-100 mt-5 mb-2">Submit</button>
                </div>
              </form>
          
    </>
  );
}
