import React, { FC } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryDetailPage, { categoryLoader } from "./pages/CategoryDetailPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import LoginPage from "./pages/LoginPage";

import { useAuthContext } from "./hooks/useAuthContext";



interface Category {
  categoryId: number;
  categoryCode: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NewCategory {
  categoryCode: string;
  name: string;
  description: string;
}

const App: FC = () => {
  const { user } = useAuthContext();

  // Create
  const addCategory = async (newCategory: NewCategory): Promise<Response> => {
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(newCategory),
    });
    console.log(res);
    return res;
  };

  // Delete
  const deleteCategory = async (id: number): Promise<Response> => {
    const res = await fetch(`/api/admin/categories/{id}?categoryId=${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user?.token}`,
      },
    });
    return res;
  };

  // Update
  const updateCategory = async (
    updatedCategory: Category
  ): Promise<Response> => {
    const res = await fetch(
      `/api/admin/categories/{id}?categoryId=${updatedCategory.categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updatedCategory),
      }
    );
    return res;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* <Route index element={<LoginPage loginSubmit={login} />} /> */}
        <Route
          index
          element={!user ? <LoginPage /> : <Navigate to="/home" />}
        />

        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />

        <Route
          path="/categories"
          element={user ? <CategoriesPage /> : <Navigate to="/" />}
        />

        <Route
          path="/add-category"
          element={
            user ? (
              <AddCategoryPage addCategorySubmit={addCategory} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/categories/:id"
          element={
            user ? (
              <CategoryDetailPage deleteCategory={deleteCategory} />
            ) : (
              <Navigate to="/" />
            )
          }
          loader={categoryLoader}
        />

        <Route
          path="/edit-category/:id"
          element={
            user ? (
              <EditCategoryPage updateCategorySubmit={updateCategory} />
            ) : (
              <Navigate to="/" />
            )
          }
          loader={categoryLoader}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
