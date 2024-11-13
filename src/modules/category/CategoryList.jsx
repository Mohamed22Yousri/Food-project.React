import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logoDelete from "../../assets/images/img-delet.png";
import Header from "../shared/Header/Header";
import logoHeader from "../../assets/images/category-logo.png";
import { toast } from "react-toastify";

export default function CategoryList() {
  const [show, setShow] = useState(false);

  const [selectId, setSelectId] = useState();
  const handleShow = (id) => {
    setSelectId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const [categories, setCategories] = useState([]);
  let getcategory = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=20&pageNumber=1",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategory();
  }, []);
  let deletIem = () => {
    axios.delete(
      `https://upskilling-egypt.com:3006/api/v1/Category/${selectId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    toast.success("Delete Category");
    getcategory();
    handleClose();
  };
  return (
    <>
      <Header
        title={`Categories Items `}
        desc={`You can now add your items that any user can order it from the Application and you can edit`}
        img={logoHeader}
      />
      <div className="container-fluid mt-4 mb-5">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Categories Table Details</h4>
          <button className="btn btn-success py-2 px-4">
            Add New Category
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">creationDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <th scope="row">{category.name}</th>
                <td> {category.creationDate}</td>
                <td>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShow(category.id)}
                    className="fa-solid fa-trash ms-1 text-danger "
                  ></i>
                  <i className="fa-solid fa-pen-to-square mx-3 text-warning"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img className="my-3" src={logoDelete} alt="" />
            <h5>Delete This Category ?</h5>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-light border border-danger text-danger"
            onClick={deletIem}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
