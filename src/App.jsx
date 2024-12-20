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

import ProtectRoute from "./modules/ProtectRoute/ProtectRoute";
import Dashboard from "./modules/dashboard/Dashboard";
import Verification from "./modules/Authentication/Verify/Verification";
import FavoretList from "./modules/Favoret-list/FavoretList";

function App() {


  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <LogIn/>,
        },
        { path: "login", element: <LogIn/> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <RegIster /> },
        { path: "verify", element: <Verification /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectRoute>
          <MasterLayout />
        </ProtectRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "category-list", element: <CategoryList/> },
        { path: "category-data", element: <Categorydata /> },
        { path: "recipe-list", element: <RecipeList /> },
        { path: "recipe-list/recipe-data", element: <RecipeData /> },
        { path: "recipe-list/:recipeId", element: <RecipeData /> },
        { path: "user-list", element: <UserList /> },
        { path: "Favoret-list", element: <FavoretList /> },
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
