import { useForm } from "react-hook-form";
import styles from "./CSS/RegIster.module.css";
import "./CSS/RegIster.module.css";
import { VALID_EMAIL, VALID_PASSWORD } from "../../Services/Validition/Valid";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegIster() {
  let navgigate = useNavigate();

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmitRegi = async (data) => {
    try {
      await axiosInstance.post(USERS_URLS.CREATE_USER, data);
      toast.success("Register is successsfully");

      navgigate("/login");
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
              type="password"
              className={`${styles["form-control"]}`}
              placeholder="password"
              id="password"
              {...register("password", VALID_PASSWORD)}
            />
            <i
              className={`${styles["icon-right"]} fa fa-eye`}
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
              type="password"
              className={`${styles["form-control"]}`}
              placeholder="confirm-password"
              id="confirm-password"
              {...register("confirmPassword", VALID_PASSWORD)}
            />
            <i
              className={`${styles["icon-right"]} fa fa-eye`}
              id="togglePassword"
            ></i>
          </div>
          {errors.confirmPassword && (
            <span className="text-danger px-2 mb-2 d-block">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="text-center">
          <button disabled={isSubmitting} className="btn btn-success mt-5 w-75">
            {isSubmitting ? "registration ..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
