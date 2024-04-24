import React, { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

interface Category {
  categoryId: number;
  categoryCode: string;
  name: string;
  description: string;
}

interface EditCategoryPageProps {
  updateCategorySubmit: (category: Category) => Promise<Response>;
}

const EditCategoryPage: React.FC<EditCategoryPageProps> = ({
  updateCategorySubmit,
}) => {
  const category: Category = useLoaderData() as Category;

  const [name, setName] = useState<string>(category.name);
  const [categoryCode, setCategoryCode] = useState<string>(
    category.categoryCode
  );
  const [description, setDescription] = useState<string>(category.description);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { id } = useParams();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Check if the user is logged in
      if (!user) {
        toast.error("You must be logged in!");
        return;
      }

      // Check if any required field is empty
      if (!categoryCode || !name || !description) {
        toast.error("Please fill in all fields");
        return;
      }

      // Check if id is undefined or null before using it
      const categoryId = id ? parseInt(id, 10) : undefined;

      if (categoryId === undefined) {
        // Handle the case where id is undefined or null
        console.error("Category ID is undefined or null");
        // return or handle the error accordingly
        return;
      }

      const updatedCategory: Category = {
        categoryId,
        name,
        categoryCode,
        description,
      };

      updateCategorySubmit(updatedCategory)
        .then((response: Response) => {
          // Access the status of the response
          if (response.status === 200) {
            // Handle success
            toast.success("Updated Successfully!");
            navigate(`/categories/${id}`);
          } else if (response.status === 403) {
            // Handle forbidden error
            toast.error("You are not authorized to do this!");
          } else {
            // Handle other errors
            toast.error("An error occurred while updating the category");
            console.error("Error updating category:", response.statusText);
          }
        })
        .catch((error: any) => {
          // Handle Promise rejection (e.g., network error)
          toast.error("An error occurred while updating the category");
          console.error("Error updating category:", error);
        });
    } catch (error) {
      console.error("An error occurred while updating the category:", error);
      toast.error("Failed to update category. Please try again later.");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Category
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Category Code
              </label>
              <input
                type="text"
                id="categoryCode"
                name="categoryCode"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter category code here..."
                required
                value={categoryCode}
                onChange={(e) => setCategoryCode(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter category's name here..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="Add category's description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCategoryPage;
