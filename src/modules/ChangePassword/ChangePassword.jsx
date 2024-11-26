import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import logoChange from "../../assets/images/logo.png"
import { useForm } from "react-hook-form";
const ChangePassword = ({show, handleClose, props,onSubmit}) => {
    const [isConfirmValid, setIsConfirmValid] = useState(false);
    const [isOldValid, setIsOldfValid] = useState(false);
    const [isNewValid, setIsNewValid] = useState(false);
    let {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
      } = useForm();
  return (
    <>
     <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <div>
            <div className="text-center">
              <img src={logoChange} alt="" />
            </div>
            <div className="py-4 px-3">
              <h3>Change Your Password</h3>
              <p>Enter your details below</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3 px-5">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isOldValid ? "text" : "password"}
                  className="form-control"
                  placeholder="Old Password"
                  aria-describedby="basic-addon1"
                  {...register("oldPassword", {
                    required: "old Password Is Required",
                  })}
                />
                <button
                  onClick={() => setIsOldfValid((prev) => !prev)}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  className="input-group-text"
                  id="basic-addon1"
                >
                  <i
                    className={`fa ${isOldValid ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </button>
              </div>
              {errors.oldPassword && (
                <span className="text-danger px-5 mb-2 d-block">
                  {errors.oldPassword.message}
                </span>
              )}

              <div className="input-group mb-3 px-5">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isNewValid ? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  aria-describedby="basic-addon1"
                  {...register("newPassword", {
                    required: "New Password Is Required",
                  })}
                />
                <button
                  onClick={() => setIsNewValid((prev) => !prev)}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  className="input-group-text"
                  id="basic-addon1"
                >
                  <i
                    className={`fa ${isNewValid ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-danger px-5 mb-2 d-block">
                  {errors.newPassword.message}
                </span>
              )}
              <div className="input-group mb-3 px-5">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isConfirmValid ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm New Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...register("confirmNewPassword", {
                    required: "Confirm New Password Is Reqired",
                  })}
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
                    className={`fa ${
                      isConfirmValid ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.confirmNewPassword && (
                <span className="text-danger px-5 mb-2 d-block">
                  {errors.confirmNewPassword.message}
                </span>
              )}
              <div className="text-center">
                <button
                  disabled={isSubmitting}
                  className="btn btn-success w-75 my-5 px-4"
                >
                  {isSubmitting ? "Changing ..." : "Change Paswword"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
    </>
  )
}

export default ChangePassword