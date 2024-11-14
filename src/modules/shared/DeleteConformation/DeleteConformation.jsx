import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logoDelete from "../../../assets/images/img-delet.png";

// eslint-disable-next-line react/prop-types
export default function DeleteConformation({show, deleteFun, handleClose, deleteItem}) {
 


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border border-0"></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img className="my-3" src={logoDelete} alt="" />
            <h5>Delete This {deleteItem} ?</h5>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-light border border-danger text-danger"
            onClick={deleteFun}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
