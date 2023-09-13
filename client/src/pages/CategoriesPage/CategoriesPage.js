import React from "react";
import Categories from "../../components/Categories/Categories";
import Aside from "../../components/Asside/Aside";

import "./CategoriesPage.css";

const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <section className="categories-section">
        <Categories />
      </section>
      <Aside />
    </div>
  );
};

export default CategoriesPage;
