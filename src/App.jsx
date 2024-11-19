import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./modules/Authentication/Login/LogIn";
import ForgetPass from "./modules/Authentication/forget pass/ForgetPass";
import ResetPass from "./modules/Authentication/Reset pass/ResetPass";
import RegIster from "./modules/Authentication/Register/RegIster";
import UserList from "./modules/Users/UserList/UserList";
import NotFound from "./modules/shared/NotFound/NotFound";
import CategoryList from "./modules/category/CategoryList";
import RecipeList from "./modules/Recipe/RecipeList";
import RecipeData from "./modules/Recipe/RecipeData";
import AuthLayout from "./modules/AuthLayout/AuthLayout";
import MasterLayout from "./modules/MasterLayout/MasterLayout";
import Categorydata from "./modules/category/Categorydata";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ProtectRoute from "./modules/ProtectRoute/ProtectRoute";
import Dashboard from "./modules/dashboard/dashboard";

function App() {
  const [loginData, setLoginData] = useState(null);
  let getToken = () => {
    let tokenDecode = localStorage.getItem("token");
    let tokenEncode = jwtDecode(tokenDecode);
    setLoginData(tokenEncode);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) getToken();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <LogIn getToken={getToken}/>,
        },
        { path: "login", element: <LogIn getToken={getToken} /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <RegIster /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard loginData={loginData} /> },
        { path: "category-list", element: <CategoryList/> },
        { path: "category-data", element: <Categorydata /> },
        { path: "recipe-list", element: <RecipeList /> },
        { path: "recipe-list/recipe-data", element: <RecipeData /> },
        { path: "recipe-list/:recipeId", element: <RecipeData /> },
        { path: "user-list", element: <UserList /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
