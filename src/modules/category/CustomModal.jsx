import Modal from "react-bootstrap/Modal";

const CustomModal = ({
  showModal,
  modalTitle,
  register,
  errors,
  isSubmitting,
  handleSubmit,
  handleCloseModal,
  onSubmit={onSubmit}
}) => {
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="border border-0">
          <h3>{modalTitle}</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2">
                <input
                  style={{ border: "none", outline: "none" }}
                  type="text"
                  className="w-100 px-2 py-3 bg-light"
                  placeholder="Category Name "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...register("name", {
                    required: "name Is Required",
                  })}
                />
              </div>
              {errors.name && (
                <span className="text-danger px-2 mb-2 d-block">
                  {errors.name.message}
                </span>
              )}
              <div className="text-end">
                <button
                  disabled={isSubmitting}
                  className="btn btn-success px-5 py-2 my-3"
                >
                  {isSubmitting ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
