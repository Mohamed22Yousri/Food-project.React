import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function ResetPass() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();
  const onSubmit = (data) => {
    try {
      axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data);
      console.log(data);
      navigate("/login");
      toast.success("Done");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="title mb-3">
        <h3 className="h5"> Reset Password</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
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
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email is not valid",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className="text-danger px-2 mb-2 d-block">
            {errors.email.message}
          </span>
        )}
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="OTP"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("seed", {
              required: "OTP is required",
            })}
          />
        </div>
        {errors.seed && (
          <span className="text-danger px-2 mb-2 d-block">
            {errors.seed.message}
          </span>
        )}
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("password", {
              required: "Password is required",
            })}
          />
        </div>
        {errors.password && (
          <span className="text-danger px-2 mb-2 d-block">
            {errors.password.message}
          </span>
        )}
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("confirmPassword")}
          />
        </div>
        <div>
          <button className="w-100 btn btn-success my-3">Reset Password</button>
        </div>
      </form>
    </>
  );
}
