import React, { FC } from "react";
import { Link } from "react-router-dom";

const ViewAllCategories: FC = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/categories"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >
        View All Categories
      </Link>
    </section>
  );
};

export default ViewAllCategories;
