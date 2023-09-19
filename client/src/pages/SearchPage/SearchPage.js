import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../redux/shared/action";

import Card from "../../components/UI/Card/Card";
import Post from "../../components/PostCom/Posts/Post/Post";
import Aside from "../../components/Asside/Aside";
import Pagination from "../../components/UI/Pagination/Pagination";

const SearchPage = props => {
  const { searchResult, isFetch, onSearchPost, currentPage, totalPost } = props;
  const query = new URLSearchParams(props.location.search);
  const q = query.get("q") || " ";
  const p = query.get("page") || 1;
  useEffect(() => {
    onSearchPost(q, p);
  }, [props.location.search, q, p, onSearchPost]);

  let myContent;
  if (searchResult.length > 0 && isFetch) {
    myContent = (
      <Fragment>
        <section className="section-posts">
          <h2 className="menu">Search Result {totalPost}</h2>
          <div className="posts">
            {searchResult.map(i => (
              <Post key={i._id} {...i} />
            ))}
            <Pagination
              totalPost={totalPost}
              currentPage={currentPage}
              perPage={10}
              query={q}
            />
          </div>
        </section>
        <Aside />
      </Fragment>
    );
  } else if (searchResult.length < 1) {
    myContent = (
      <Card>
        <div
          style={{ textAlign: "center", padding: "1rem" }}
          className="search-not-found"
        >
          <h3>No Result Found</h3>
          <p>Please Try with different keywords</p>
        </div>
      </Card>
    );
  }
  return <div className="homepage">{myContent}</div>;
};
const mapStateToProps = ({
  shared: { searchResult, isFetch, currentPage, totalPost }
}) => ({
  searchResult,
  isFetch,
  currentPage,
  totalPost
});

const mapDispatchToProps = dispatch => ({
  onSearchPost: (query, page) => dispatch(actions.searchPost(query, page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchPage));
