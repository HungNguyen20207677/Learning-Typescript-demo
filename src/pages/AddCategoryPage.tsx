import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

interface Category {
  categoryCode: string;
  name: string;
  description: string;
}

interface AddCategoryPageProps {
  addCategorySubmit: (category: Category) => Promise<any>;
}

const AddCategoryPage: FC<AddCategoryPageProps> = ({ addCategorySubmit }) => {
  const [name, setName] = useState<string>("");
  const [categoryCode, setCategoryCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const newCategory: Category = {
        categoryCode,
        name,
        description,
      };

      const response = await addCategorySubmit(newCategory);

      // Check the status code of the response
      if (response.status === 201) {
        toast.success("Added Successfully!");
        navigate("/categories");
      } else if (response.status === 403) {
        toast.error("You are not authorized to do this!");
      } else {
        toast.error("An error occurred while adding the category");
        console.error("Error adding category:", response.statusText);
      }
    } catch (error) {
      toast.error("An error occurred while adding the category");
      console.error("Error adding category:", error);
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Category
            </h2>

            <div className="mb-4">
              <label
                htmlFor="category_code"
                className="block text-gray-700 font-bold mb-2"
              >
                Category Code
              </label>
              <input
                type="text"
                id="category_code"
                name="categoryCode"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter category code here..."
                required
                value={categoryCode}
                onChange={(e) => setCategoryCode(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
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
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCategoryPage;
