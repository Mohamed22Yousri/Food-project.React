import { useForm } from "react-hook-form";
import { VALID_EMAIL } from "../../Services/Validition/Valid";
import { axiosInstance, USERS_URLS } from "../../Services/Urls/Urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Verification = () => {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const Navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(USERS_URLS.VERIFY_USER, data);
      Navigate("/login");
      toast.success("Done");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="title mb-4">
        <h3 className="h5">Verify</h3>
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
            style={{ boxShadow: "none" }}
            type="text"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("email", VALID_EMAIL)}
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
            type="password"
            className="form-control "
            placeholder="Enter Your Code"
            aria-describedby="basic-addon1"
            {...register("code", {
              required: "Code Is Required",
            })}
          />
        </div>
        {errors.code && (
          <span className="text-danger px-2 mb-2 d-block">
            {errors.code.message}
          </span>
        )}
        <div>
          <button
            className="btn btn-success w-100 my-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Verify"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Verification;
