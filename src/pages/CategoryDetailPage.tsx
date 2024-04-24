import React, { FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link, LoaderFunction } from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";


interface Category {
  categoryId: number;
  categoryCode: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryDetailPageProps {
  deleteCategory: (id: number) => Promise<Response>;
}

const CategoryDetailPage: FC<CategoryDetailPageProps> = ({
  deleteCategory,
}) => {
  const category: Category = useLoaderData() as Category;
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const onDeleteClick = (id: number) => {
    try {
      // Check if the user is logged in
      if (!user) {
        toast.error("You must be logged in!");
        return;
      }

      const confirm = window.confirm(
        "Are you sure you want to delete this listing?"
      );

      if (!confirm) return;

      deleteCategory(id)
        .then((response) => {
          // Access the status of the response
          if (response.status === 200) {
            // Handle success
            toast.success("Deleted Successfully!");
            navigate("/categories");
          } else if (response.status === 403) {
            // Handle forbidden error
            toast.error("You are not authorized to do this!");
          } else {
            // Handle other errors
            toast.error("An error occurred while deleting the category");
            console.error("Error deleting category:", response.statusText);
          }
        })
        .catch((error) => {
          // Handle Promise rejection (e.g., network error)
          toast.error("An error occurred while deleting the category");
          console.error("Error deleting category:", error);
        });
    } catch (err) {
      console.error("An error occurred while updating the category:", err);
      toast.error("Failed to delete category. Please try again later.");
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/categories"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Category List
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">
                  {category.categoryCode}
                </div>
                <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">{category.updatedAt.toString()}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Category Description
                </h3>

                <p className="mb-4">{category.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Created At
                </h3>

                <p className="mb-4">{category.createdAt.toString()}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Manage Category</h3>
                <Link
                  to={`/edit-category/${category.categoryId}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Category
                </Link>
                <button
                  onClick={() => onDeleteClick(category.categoryId)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Category
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const categoryLoader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`/api/admin/categories/{id}?categoryId=${params.id}`);
  const data = await res.json();
  return data;
};

export { CategoryDetailPage as default, categoryLoader };
