import Header from "../shared/Header/Header";
import logoHeader from "../../assets/images/category-logo.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logoDelete from "../../assets/images/img-delet.png";
import { toast } from "react-toastify";

export default function Recipe() {
  const [recpies, setRecpies] = useState([]);
  const [show, setShow] = useState(false);
  const [recpieId, setRecpieId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRecpieId(id);
  };
  let deletItem = async () => {
    await axios.delete(
      `https://upskilling-egypt.com:3006/api/v1/Recipe/${recpieId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    toast.success("Delete Recipe");
    getRecpies();
    handleClose();
  };

  let getRecpies = async () => {
    try {
      let res = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=20&pageNumber=1"
      );
      setRecpies(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecpies();
  }, []);

  return (
    <>
      <Header
        title={`Recipes Items`}
        img={logoHeader}
        desc={`You can now add your items that any user can order it from the Application and you can edit`}
      />
      <div className="container-fluid my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Recipes Table Details</h4>
          <button className="btn btn-success py-2 px-4">
            Add New Category
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Images</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recpies.map((recpie) => (
              <tr key={recpie.id}>
                <td>{recpie.name}</td>
                <td style={{ width: "20%" }}>
                  <div>
                    <img
                      className="w-25"
                      src={`https://upskilling-egypt.com:3006/${recpie.imagePath}`}
                      alt=""
                    />
                  </div>
                </td>
                <td>{recpie.price}</td>
                <td className="w-25">{recpie.description}</td>
                <td>{recpie.tag.name}</td>
                <td>
                  <i
                    onClick={() => handleShow(recpie.id)}
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-trash ms-1 text-danger "
                  ></i>
                  <i className="fa-solid fa-pen-to-square mx-3 text-warning"></i>
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={logoDelete} alt="" />
            <h5 className="my-4">Delete This Recipe</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-light border border-danger text-danger"
            onClick={deletItem}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
