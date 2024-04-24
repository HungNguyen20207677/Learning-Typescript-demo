import React, { FC } from "react";
import CategoryList from "../components/CategoryList";

const CategoriesPage: FC = () => {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <CategoryList />
    </section>
  );
};

export default CategoriesPage;
