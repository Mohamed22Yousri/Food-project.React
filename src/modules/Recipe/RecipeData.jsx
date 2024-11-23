import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../dashboard/CSS/Dashboard.module.css";
import { useEffect, useState } from "react";
import {
  axiosInstance,
  CATEGORIES_URLS,
  RECIPES,
  TAG,
} from "../Services/Urls/Urls";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BeforeUnLoad from "../Hooks/BeforeUnLoad";

const RecipeData = () => {
  
  const [tags, setTags] = useState([]);
  const params = useParams();
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();
  BeforeUnLoad(()=> {
    console.log("hello");
    
  })
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key != "recipeImage") {
        formData.append(key, data[key]);
      } else {
        formData.append("recipeImage", data?.[key]?.[0]);
      }
    }

    try {
      const res = await axiosInstance[isNewRecipe ? "post" : "put"](
        isNewRecipe
          ? RECIPES.GET_AND_POST_RECIPES
          : RECIPES.DELETE_AND_EDITE_RECIPES(recipeId),
        formData
      );
      console.log(isNewRecipe);

      console.log(res);

      navigate("/dashboard/recipe-list");

      reset();
      toast.success("Add Category");
    } catch (error) {
      console.log(error);
    }
  };
  const recipeId = params.recipeId;
  const isNewRecipe = recipeId == undefined;
  useEffect(() => {
    const getTag = async () => {
      let res = await axiosInstance.get(TAG.GET_TAG);
      setTags(res.data);
    };
    const getCategories = async () => {
      let res = await axiosInstance.get(
        CATEGORIES_URLS.GET_AND_POST_CATEGORIES
      );
      setCategories(res.data.data);
    };
    (async () => {
      await getTag();
      await getCategories();
      try {
        if (!isNewRecipe) {
          const getrecipeId = async () => {
            const res = await axiosInstance.get(
              RECIPES.DELETE_AND_EDITE_RECIPES(recipeId)
            );
            console.log(res.data);
            const recipe = res?.data;
            setValue("name", recipe?.name);
            setValue("price", recipe?.price);
            setValue("description", recipe?.description);
            setValue("tagId", recipe?.tag?.id);
            setValue("categoriesIds", recipe?.catogrya?.[0]?.id);
            console.log(recipeId);
          };
          getrecipeId();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [recipeId, setValue, isNewRecipe]);

 

  return (
    <>
      <header className={`${styles["header"]} mx-2 container`}>
        <div className={styles["title"]}>
          <h3>
            Fill the <span className="text-success">Recipes</span> !
          </h3>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div>
          <Link
            to="/dashboard/recipe-list"
            className="py-2 px-3 btn btn-success"
          >
            All Recipes
            <svg
              className="ms-1"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9927 10.7075C20.9927 11.0168 20.8783 11.2827 20.6494 11.5054L14.5542 17.5913C14.4367 17.7088 14.313 17.7954 14.1831 17.8511C14.0532 17.9067 13.9202 17.9346 13.7842 17.9346C13.4749 17.9346 13.2214 17.8356 13.0234 17.6377C12.8255 17.446 12.7266 17.2048 12.7266 16.9141C12.7266 16.7656 12.7575 16.6265 12.8193 16.4966C12.875 16.3667 12.9523 16.2523 13.0513 16.1533L15.1294 14.0566L18.5156 10.9487L18.8867 11.5889L15.6118 11.7837H4.46045C4.13883 11.7837 3.87907 11.6847 3.68115 11.4868C3.47705 11.2889 3.375 11.0291 3.375 10.7075C3.375 10.3921 3.47705 10.1354 3.68115 9.9375C3.87907 9.73958 4.13883 9.64063 4.46045 9.64063L15.6118 9.64062L18.8867 9.83545L18.5156 10.4663L15.1294 7.36768L13.0513 5.271C12.9523 5.17204 12.875 5.05762 12.8193 4.92773C12.7575 4.79785 12.7266 4.65869 12.7266 4.51025C12.7266 4.21956 12.8255 3.97835 13.0234 3.78662C13.2214 3.5887 13.4749 3.48975 13.7842 3.48975C14.0625 3.48975 14.3161 3.60107 14.5449 3.82373L20.6494 9.91895C20.8783 10.1354 20.9927 10.3983 20.9927 10.7075Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles["recipe-from"]} d-flex flex-column`}
      >
        <div className={styles["recipe-input"]}>
          <input
            {...register("name", {
              required: "Recipe Name Is Required",
            })}
            className="form-control py-2"
            type="text"
            placeholder="Recipe Name"
            aria-label="form-control example"
          />
          {errors.name && (
            <div className="text-danger px-2 pt-2">{errors.name?.message}</div>
          )}
        </div>
        <div className={styles["recipe-input"]}>
          <select
            {...register("tagId", {
              required: "Recipe Tag Is Required",
              validate: (value) => value !== "",
            })}
            className="form-select py-2 "
            aria-label="Default select example"
          >
            <option disabled selected value="">
              Tag
            </option>
            {tags?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tagId && (
            <div className="text-danger px-2 pt-2">{errors.tagId?.message}</div>
          )}
        </div>
        <div className={styles["recipe-input"]}>
          <input
            {...register("price", {
              required: "Recipe price Is Required",
            })}
            className="form-control  py-2"
            type="text"
            placeholder="Price"
            aria-label="form-control example"
          />
          {errors.price && (
            <div className="text-danger px-2 pt-2">{errors.price?.message}</div>
          )}
        </div>
        <div className={styles["recipe-input"]}>
          <select
            {...register("categoriesIds")}
            className="form-select py-2 "
            aria-label="Default select example"
          >
            <option disabled selected>
              Categ
            </option>
            {categories?.map((catogry) => (
              <option key={catogry.id} value={catogry.id}>
                {catogry.name}
              </option>
            ))}
          </select>
          {errors.categoriesIds && (
            <div className="text-danger px-2 pt-2">
              {errors.categoriesIds?.message}
            </div>
          )}
        </div>
        <div className={styles["recipe-input"]}>
          <div className="form-floating">
            <textarea
              {...register("description", {
                required: "Recipe description Is Required",
              })}
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
            ></textarea>
            <label htmlFor="floatingTextarea">Description</label>
          </div>
          {errors.description && (
            <div className="text-danger px-2 pt-2">
              {errors.description?.message}
            </div>
          )}
        </div>
        <div className={styles["recipe-input"]}>
          <input
            {...register("recipeImage")}
            className="form-control py-2"
            type="file"
            placeholder="Recipe Name"
            aria-label="form-control example"
          />
        </div>
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ gap: "20px" }}
        >
          <Link
            to="/dashboard/recipe-list"
            className="btn border border-success px-5 text-success"
          >
            Cancel
          </Link>
          <button
            disabled={isSubmitting}
            className="btn btn-success px-4 py-1 "
          >
            {isSubmitting ? "Saving .." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeData;
