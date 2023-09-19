import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import "./Pagination.css";

const Pagination = props => {
  const { currentPage, perPage, totalPost, query } = props;
  const hasNextPage = perPage * currentPage < totalPost;
  let nextPage;
  let prevPage;
  let lastPage;
  if (currentPage > 1) {
    prevPage = currentPage - 1;
  }
  if (hasNextPage) {
    nextPage = currentPage + 1;
  }

  lastPage = Math.ceil(totalPost / perPage);

  let myQuery = "";
  if (query) {
    myQuery = `q=${query}&`;
  }

  return (
    <div className="pagination">
      {prevPage !== 1 && currentPage !== 1 ? (
        <span
          className="page"
          onClick={() => props.history.push(`?${myQuery}page=1`)}
        >
          1
        </span>
      ) : null}
      {prevPage ? (
        <span
          className="page"
          onClick={() => props.history.push(`?${myQuery}page=${prevPage}`)}
        >
          {prevPage}
        </span>
      ) : null}

      <span>{currentPage}</span>
      {nextPage ? (
        <span
          className="page"
          onClick={() => props.history.push(`?${myQuery}page=${nextPage}`)}
        >
          {nextPage}
        </span>
      ) : null}
      {lastPage && nextPage !== lastPage && currentPage !== lastPage ? (
        <Fragment>
          <span>...</span>
          <span
            className="page"
            onClick={() => props.history.push(`?${myQuery}page=${lastPage}`)}
          >
            {lastPage}
          </span>
        </Fragment>
      ) : null}
    </div>
  );
};

export default withRouter(Pagination);
