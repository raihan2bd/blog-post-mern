import React from "react";

import { FaArrowLeft } from "react-icons/fa";

import "./CustomSearch.css";

const CustomSearch = ({
  toggleActiveSearchHandler,
  search,
  submitSearch,
  searchChange
}) => {
  return (
    <div className="active-search">
      <span onClick={toggleActiveSearchHandler} className="left-arrow">
        <FaArrowLeft />
      </span>
      <form className="custom-serch-form" onSubmit={submitSearch}>
        <input
          type="search"
          placeholder="Search Here!"
          name="search"
          onChange={searchChange}
          value={search}
          className="active-search__input"
        />
        <button type="submit" className="search-button">
          <span className="r3-search"></span>
        </button>
      </form>
    </div>
  );
};

export default CustomSearch;
