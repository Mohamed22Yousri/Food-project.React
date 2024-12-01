import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Header from "../shared/Header/Header";
import { toast } from "react-toastify";
import DeleteConformation from "../shared/DeleteConformation/DeleteConformation";
import NoData from "../shared/NoData/NoData";
import { useForm } from "react-hook-form";
import { axiosInstance, CATEGORIES_URLS } from "../Services/Urls/Urls";
import Loading from "../shared/Loading/Loading";

export default function CategoryList() {
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const [show, setShow] = useState(false);
  const [selectId, setSelectId] = useState();
  const handleShow = (id) => {
    setSelectId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  let getcategory = async (PageSize, pageNo, name) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(
        CATEGORIES_URLS.GET_AND_POST_CATEGORIES,
        {
          params: { pageSize: PageSize, pageNumber: pageNo, name: name },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getNameVal = (input) => {
    getcategory(4, 1, input.target.value);
  };
  useEffect(() => {
    getcategory(4, 1);
  }, []);
  let deleteCategory = async () => {
    try {
      await axiosInstance.delete(
        CATEGORIES_URLS.DELETE_AND_EDITE_CATEGORIES(selectId)
      );
      toast.success("Delete Category");
      getcategory();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  // Add category
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(
        `${CATEGORIES_URLS.GET_AND_POST_CATEGORIES}`,
        data
      );
      reset();
      toast.success("Add Category");
      handleCloseAdd();
      getcategory(4, 1);
    } catch (error) {
      console.log(error);
    }
  };
  // Edit category
  const [EdiltId, setEditId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (id, category) => {
    setEditId(id);
    setValue("name", category.name);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);
  const onSubmitEdit = async (data) => {
    try {
      await axiosInstance.put(
        CATEGORIES_URLS.DELETE_AND_EDITE_CATEGORIES(EdiltId),
        data
      );
      toast.success("Edit Category");
      getcategory(4, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title={`Categories Items `}
        desc={`You can now add your items that any user can order it from the Application and you can edit`}
      />

      <div className="container-fluid mt-4 mb-5">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Categories Table Details</h4>

          <button onClick={handleShowAdd} className="btn btn-success py-2 px-4">
            Add New Category
          </button>
        </div>
        <div>
          <div className="row my-4">
            <div className="col-12">
              <input
                onChange={getNameVal}
                type="text"
                placeholder="User Name ..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <Loading loading={loading} />

        {categories.length > 0 ? (
          <div>

            <table className="table text-center mt-4">
              <thead>
                <tr className="table-primary">
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
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => handleShowEdit(category.id, category)}
                        className="fa-solid fa-pen-to-square mx-3 text-warning"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex justify-content-center">
                <li className="page-item">
                  <a
                    style={{ cursor: "pointer" }}
                    className="page-link"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {arrayOfPages.map((pages) => (
                  <li
                    className="page-item"
                    key={pages}
                    onClick={() => getcategory(4, pages)}
                  >
                    <a style={{ cursor: "pointer" }} className="page-link">
                      {pages}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    style={{ cursor: "pointer" }}
                    className="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <NoData />
        )}
      </div>
      <DeleteConformation
        show={show}
        deleteFun={deleteCategory}
        handleClose={handleClose}
        deleteItem={"category"}
      />

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton className="border border-0">
          <h3>Add Category</h3>
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
                  className="btn btn-success px-5 py-2 my-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Save ..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="border border-0">
          <h3>Edit Category</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(onSubmitEdit)}>
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
                  onClick={handleCloseEdit}
                  className="btn btn-success px-5 py-2 my-3"
                >
                  {isSubmitting ? "Save ..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}