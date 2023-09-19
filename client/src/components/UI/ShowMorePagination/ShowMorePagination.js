import React, { Fragment } from "react";
import Button from "../Button/Button";

const ShowMorePagination = ({
  hasNextPage,
  hasPrevPage,
  handleShowLess,
  handleShowMore,
  label
}) => {
  return (
    <Fragment>
      {hasPrevPage || hasNextPage ? (
        <div className="pagination">
          {hasPrevPage ? (
            <Button btnClass="show-pagination" onClick={handleShowLess}>
              Less {label} &#8593;
            </Button>
          ) : null}
          {hasNextPage ? (
            <Button btnClass="show-pagination" onClick={handleShowMore}>
              More {label} &#8595;
            </Button>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

export default ShowMorePagination;
