import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { useState } from "react";

export default function ResetPass() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);


  const location = useLocation()
  let {
    register,
    formState: { errors ,isSubmitting },
    handleSubmit,
  } = useForm({defaultValues:{email:location.state}});
  let navigate = useNavigate();
  const onSubmit = (data) => {
    try {
      axiosInstance.post(USERS_URLS.RESET_PASSWORD, data);
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
          disabled={true}
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
            type={isPasswordValid ? "text" : "password"}
            className="form-control"
            placeholder="New Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("password", {
              required: "Password is required",
            })}
          />
            <button
            onClick={() => setIsPasswordValid((prev) => !prev)}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onMouseUp={(e) => e.preventDefault()}
            className="input-group-text"
            id="basic-addon1"
          >
            <i
              className={`fa ${isPasswordValid ? "fa-eye" : "fa-eye-slash"}`}
            ></i>
          </button>
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
            type={isConfirmValid ? "text" : "password"}
            className="form-control"
            placeholder="Confirm New Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("confirmPassword")}
          />
            <button
            onClick={() => setIsConfirmValid((prev) => !prev)}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onMouseUp={(e) => e.preventDefault()}
            className="input-group-text"
            id="basic-addon1"
          >
            <i
              className={`fa ${isConfirmValid ? "fa-eye" : "fa-eye-slash"}`}
            ></i>
          </button>
        </div>
        <div>
        <button
            className="btn btn-success w-100 my-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Reset Password"}
          </button>        </div>
      </form>
    </>
  );
}
