import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { VALID_EMAIL } from "../../Services/Validition/Valid";

export default function ForgetPass() {

  
  let navigate = useNavigate();
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    try {
      axiosInstance.post(USERS_URLS.FORGET_PASSWORD, data);
      navigate("/reset-pass",{state:data.email});
      toast.success("Email is successsfully");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="title mb-4">
        <h3 className="h6">Forgot Your Password?</h3>
        <span className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link
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
            {...register("email", VALID_EMAIL)}
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
        <div>
          <button
            className="btn btn-success w-100 mt-5 mb-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
