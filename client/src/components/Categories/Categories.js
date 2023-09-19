import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let unmounted = false;

    axios
      .get("/api/posts/categories")
      .then(res => {
        if (!unmounted) {
          setCategories(res.data);
        }
      })
      .catch(err => {
        console.log(err.response);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  let myCategories = categories.map(cat => {
    return (
      <li key={cat._id}>
        <Link className="cat-link" to={`/categories/${cat.route}`}>
          {cat.title}
        </Link>
      </li>
    );
  });

  let myContent = "";
  if (categories.length <= 0) {
    myContent = <h4>No Categories Found</h4>;
  } else {
    myContent = myCategories;
  }
  return (
    <div className="categories">
      <h2 className="menu">Categories</h2>
      <ul>{myContent}</ul>
    </div>
  );
};

export default Categories;
