import { useForm } from "react-hook-form";
import styles from "./CSS/RegIster.module.css";
import "./CSS/RegIster.module.css";
import { VALID_EMAIL, VALID_PASSWORD } from "../../Services/Validition/Valid";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegIster() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  let navgigate = useNavigate();

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmitRegi = async (data) => {
    try {
      await axiosInstance.post(USERS_URLS.REGISTER_USER, data);
      toast.success("Register is successsfully");

      navgigate("/verify");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="title mb-4">
        <h3 className="h5">Register</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmitRegi)} className=" row mb-5">
        <div className="col-md-6 col-12">
          <div className={`${styles["input-container"]}`}>
            <i
              className={`${styles["icon-left"]} fa-solid fa-mobile-screen-button`}
            ></i>
            <input
              {...register("userName", {
                required: "UserName Is Required",
              })}
              type="text"
              className={`${styles["form-control"]}`}
              placeholder="UserName"
              id="UserName"
            />
          </div>
          {errors.userName && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.userName.message}
            </span>
          )}
          <div className={`${styles["input-container"]}`}>
            <i
              className={`${styles["icon-left"]}  fa-solid fa-mobile-screen-button`}
            ></i>
            <input
              {...register("country", {
                required: "country Is Required",
              })}
              type="text"
              className={`${styles["form-control"]}`}
              placeholder="Country"
              id="Country"
            />
          </div>
          {errors.country && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.country.message}
            </span>
          )}
          <div className={`${styles["input-container"]}`}>
            <i className={`${styles["icon-left"]} fas fa-lock`}></i>
            <input
              type={isPasswordValid ? "text" : "password"}
              className={`${styles["form-control"]}`}
              placeholder="password"
              id="password"
              {...register("password", VALID_PASSWORD)}
            />
            <i
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              onClick={() => setIsPasswordValid((prev) => !prev)}
              className={`${styles["icon-right"]} ${
                isPasswordValid ? " fa fa-eye" : "fa fa-eye-slash"
              }`}
              id="togglePassword"
            ></i>
          </div>
          {errors.password && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="col-md-6 col-12 ">
          <div className={`${styles["input-container"]}`}>
            <i
              className={`${styles["icon-left"]} fa-solid fa-mobile-screen-button`}
            ></i>{" "}
            <input
              type="text"
              className={`${styles["form-control"]}`}
              placeholder="Enter your E-mail"
              id="Email"
              {...register("email", VALID_EMAIL)}
            />
          </div>
          {errors.email && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.email.message}
            </span>
          )}
          <div className={`${styles["input-container"]}`}>
            <i
              className={`${styles["icon-left"]} fa-solid fa-mobile-screen-button`}
            ></i>{" "}
            <input
              type="text"
              className={`${styles["form-control"]}`}
              placeholder="PhoneNumber"
              id="PhoneNumber"
              {...register("phoneNumber", {
                required: "phoneNumber Is Required",
              })}
            />
          </div>
          {errors.email && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.phoneNumber.message}
            </span>
          )}
          <div className={`${styles["input-container"]}`}>
            <i className={`${styles["icon-left"]}  fas fa-lock`}></i>{" "}
            <input
              type={isConfirmValid ? "text" : "password"}
              className={`${styles["form-control"]}`}
              placeholder="confirm-password"
              id="confirm-password"
              {...register("confirmPassword", VALID_PASSWORD)}
            />
            <i
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              onClick={() => setIsConfirmValid((prev) => !prev)}
              className={`${styles["icon-right"]} ${
                isConfirmValid ? " fa fa-eye" : "fa fa-eye-slash"
              }`}
              id="togglePassword"
            ></i>
          </div>
          {errors.confirmPassword && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.confirmPassword.message}
            </span>
          )}
          <div className="text-end">
            <Link to="/login" className={`${styles["links"]}`}>
              Login Now?
            </Link>
          </div>
        </div>

        <div className="text-center">
          <button disabled={isSubmitting} className="btn btn-success mt-5 w-75">
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
