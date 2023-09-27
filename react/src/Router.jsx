import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/categories",
                element: <Categories />,
            },
            {
                path: "/products",
                element: <Products />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
