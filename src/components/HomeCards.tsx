import React, { FC } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const HomeCards: FC = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">For Users</h2>
            <p className="mt-2 mb-4">Browse categories here!</p>
            <Link
              to="/categories"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Categories
            </Link>
          </Card>
          <Card bg="bg-indigo-100">
            <h2 className="text-2xl font-bold">For Admins</h2>
            <p className="mt-2 mb-4">Add your categories here!</p>
            <Link
              to="/add-category"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Category
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
