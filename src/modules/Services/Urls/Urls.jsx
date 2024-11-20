import axios from "axios";

export const baseURL = "https://upskilling-egypt.com:3006/api/v1/";

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

// Users
export const USERS_URLS = {
  LOGIN: "Users/Login",
  FORGET_PASSWORD: "Users/Reset/Request",
  RESET_PASSWORD: "Users/Reset",
  CREATE_USER : "Users/Create"
};

//Category
export const CATEGORIES_URLS = {
  GET_AND_POST_CATEGORIES: "Category/",
  DELETE_AND_EDITE_CATEGORIES: (id) => `Category/${id}`,
};
//Recipe
export const RECIPES = {
  GET_AND_POST_RECIPES: "Recipe/",
  DELETE_AND_EDITE_RECIPES: (id) => `Recipe/${id}`,
};
//Tag
export const TAG = {
  GET_TAG: "tag/",
};
