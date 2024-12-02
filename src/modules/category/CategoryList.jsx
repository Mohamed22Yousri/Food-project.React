import { useEffect } from "react";
import { useState } from "react";

import Header from "../shared/Header/Header";
import { toast } from "react-toastify";
import DeleteConformation from "../shared/DeleteConformation/DeleteConformation";
import NoData from "../shared/NoData/NoData";
import { useForm } from "react-hook-form";
import { axiosInstance, CATEGORIES_URLS } from "../Services/Urls/Urls";
import Loading from "../shared/Loading/Loading";
import CustomModal from "./CustomModal";

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
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const initialPage = page ? parseInt(page, 10) : 1;
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
    getcategory(4, initialPage);
  }, []);
  const handlePageChange = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);

    getcategory(4, page);
  };

  let deleteCategory = async () => {
    try {
      await axiosInstance.delete(
        CATEGORIES_URLS.DELETE_AND_EDITE_CATEGORIES(selectId)
      );
      toast.success("Delete Category");
      getcategory(4, initialPage);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  //ADD EDITE
  const [isEdit, setIsEdit] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Category");
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const handleShowModal = (isEditing = false, category = null) => {
    setShowModal(true);
    setIsEdit(isEditing);
    setModalTitle(isEdit ? "Add Category" : "Edit Category");
    if (isEditing && category) {
      setCurrentId(category.id);
      setValue("name", category.name);
    }
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await axiosInstance.put(
          CATEGORIES_URLS.DELETE_AND_EDITE_CATEGORIES(currentId),
          data
        );
        toast.success("Category Edited Successfully");
      } else {
        await axiosInstance.post(
          `${CATEGORIES_URLS.GET_AND_POST_CATEGORIES}`,
          data
        );
        toast.success("Category Added Successfully");
      }

      handleCloseModal();
      getcategory(4, 1);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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

          <button
            onClick={() => handleShowModal(false)}
            className="btn btn-success py-2 px-4"
          >
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
                        onClick={() => handleShowModal(category.id, category)}
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
                    className={`page-item ${
                      parseInt(window.location.search.split("=")[1]) === pages
                        ? "active"
                        : ""
                    }`}
                    key={pages}
                    onClick={() => handlePageChange(pages)}
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
      <CustomModal
        showModal={showModal}
        modalTitle={modalTitle}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        handleCloseModal={handleCloseModal}
        onSubmit={onSubmit}
      />
    </>
  );
}
