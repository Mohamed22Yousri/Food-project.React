import Header from "../shared/Header/Header";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DeleteConformation from "../shared/DeleteConformation/DeleteConformation";
import NoData from "../shared/NoData/NoData";
import logoDelete from "../../assets/images/img-delet.png";
import {
  axiosInstance,
  CATEGORIES_URLS,
  RECIPES,
  TAG,
  USER_RECIPES,
} from "../Services/Urls/Urls";
import Loading from "../shared/Loading/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function Recipe() {
  let { loginData } = useContext(AuthContext);
  const [recpies, setRecpies] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [show, setShow] = useState(false);
  const [recpieId, setRecpieId] = useState();
  const [loading, setLoading] = useState(true);
  const [nameValu, setNameValu] = useState("");
  const [tagValu, settagValu] = useState("");
  const [catValu, setcatValu] = useState("");
   const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const initialPage = page ? parseInt(page, 10) : 1;

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRecpieId(id);
  };
  const addFavList = async (id) => {
    let res = await axiosInstance.post(USER_RECIPES.Add_FAV_LIST, {
      recipeId: id,
    });
    console.log(res.data);
  };

  let deleteRecipe = async () => {
    await axiosInstance.delete(RECIPES.DELETE_AND_EDITE_RECIPES(recpieId));
    toast.success("Delete Recipe");
    getRecpies(4, initialPage);
    handleClose();
  };

  let getRecpies = async (pageSize, pageNo, name, tag, cat) => {
    try {
      setLoading(true);
      let res = await axiosInstance.get(RECIPES.GET_AND_POST_RECIPES, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          name: name,
          tagId: tag,
          categoryId: cat,
        },
      });
      setArrayOfPages(
        Array(res.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );

      setRecpies(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getTag = async () => {
    let res = await axiosInstance.get(TAG.GET_TAG);
    setTags(res.data);
  };
  const getCategories = async () => {
    let res = await axiosInstance.get(CATEGORIES_URLS.GET_AND_POST_CATEGORIES);
    setCategories(res.data.data);
  };
  const getNameVal = (input) => {
    setNameValu(input.target.value);
    getRecpies(4, 1, input.target.value, tagValu, catValu);
  };
  const getTagVal = (input) => {
    settagValu(input.target.value);
    getRecpies(4, 1, nameValu, input.target.value, catValu);
  };
  const getCatVal = (input) => {
    setcatValu(input.target.value);
    getRecpies(4, 1, nameValu, tagValu, input.target.value);
  };

  useEffect(() => {
   
    getRecpies(4, initialPage, nameValu, tagValu, catValu);
    getTag();
    getCategories();
  }, []);
  const handlePageChange = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);

    getRecpies(4, page, nameValu, tagValu, catValu);
  };

  return (
    <>
      <Header
        title={`Recipes Items`}
        desc={`You can now add your items that any user can order it from the Application and you can edit`}
      />
      <div className="container-fluid my-4">
        <div className="d-flex justify-content-between align-items-center pt-2 pb-3">
          <h4>Recipes Table Details</h4>
          {loginData?.userGroup != "SystemUser" ? (
            <Link
              to="/dashboard/recipe-list/recipe-data"
              className="btn btn-success py-2 px-4"
            >
              Add New Recipes
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="row my-4">
          <div className="col-6">
            <input
              onChange={getNameVal}
              type="text"
              placeholder="Search here ..."
              className="form-control"
            />
          </div>
          <div className="col-3">
            <select
              onChange={getTagVal}
              className="form-select py-2 "
              aria-label="Default select example"
            >
              <option selected value="">
                Tag
              </option>
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-3">
            <select
              onChange={getCatVal}
              className="form-select py-2 "
              aria-label="Default select example"
            >
              <option selected>Categ</option>
              {categories?.map((catogry) => (
                <option key={catogry.id} value={catogry.id}>
                  {catogry.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Loading loading={loading} />
        {recpies.length > 0 ? (
          <div className="">
            <table className="table text-center mt-2 .table-container">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Name</th>
                  <th scope="col">Images</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recpies.map((recpie) => (
                  <tr key={recpie?.id}>
                    <td className="align-middle">{recpie?.name}</td>
                    <td style={{ width: "20%" }}>
                      <div className="p-0">
                        {recpie?.imagePath ? (
                          <img
                            className="w-25"
                            src={`https://upskilling-egypt.com:3006/${recpie?.imagePath}`}
                            alt=""
                          />
                        ) : (
                          <img className="w-25" src={logoDelete} alt="" />
                        )}
                      </div>
                    </td>
                    <td className="align-middle">{recpie?.price}</td>
                    <td className="w-25 align-middle">{recpie?.description}</td>
                    <td className="align-middle">{recpie?.tag?.name}</td>
                    <td className="align-middle">
                      {recpie?.category[0]?.name}
                    </td>
                    {loginData?.userGroup != "SystemUser" ? (
                      <td className="align-middle">
                        <i
                          onClick={() => handleShow(recpie?.id)}
                          style={{ cursor: "pointer" }}
                          className="fa-solid fa-trash ms-1 text-danger "
                        ></i>
                        <Link to={`/dashboard/recipe-list/${recpie.id}`}>
                          <i
                            style={{ cursor: "pointer" }}
                            className="fa-solid fa-pen-to-square mx-3 text-warning"
                          ></i>
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <i
                          onClick={() => addFavList(recpie.id)}
                          style={{ color: "red", cursor: "pointer" }}
                          className="fa-regular fa-heart "
                        ></i>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ cursor: "pointer" }}
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
                    <a className="page-link" style={{ cursor: "pointer" }}>
                      {pages}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ cursor: "pointer" }}
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
        deleteFun={deleteRecipe}
        handleClose={handleClose}
        deleteItem={"Recipe"}
      />
    </>
  );
}
