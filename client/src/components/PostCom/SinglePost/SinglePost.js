import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";

import * as actions from "../../../redux/post/actions";

import Like from "../Like/Like";
import Share from "../Share/Share";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import Comments from "../Comments/Comments";
import ShowMorePagination from "../../UI/ShowMorePagination/ShowMorePagination";

import "./SinglePost.css";

const SinglePost = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const { post, loadingPost, onFetchSinglePost, isAuth, user } = props;
  const postId = props.match.params.postId;
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    onFetchSinglePost(postId);
  }, [onFetchSinglePost, postId]);

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleShowLess = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleShare = () => {
    setIsShare(!isShare);
  };

  const shareFb = () => {
    const url = `http://${window.location.host}/posts/${postId}`;
    setIsShare(false);
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" + url,
      "facebook-popup",
      "height=350,width=600"
    );
  };

  const shareTw = () => {
    const url = `http://${window.location.host}/posts/${postId}`;
    setIsShare(false);
    window.open(
      "https://twitter.com/share?url=" + url,
      "twitter-popup",
      "height=350,width=600"
    );
  };

  let totalComments = 0;
  let filterComments;
  if (post.comments) {
    totalComments = post.comments.length;
    const indexOfLastCom = currentPage * perPage;
    // const indexOfFirstCom = indexOfLastCom - perPage;
    filterComments = post.comments.slice(0, indexOfLastCom);
  }

  const hasNextPage = Math.ceil(totalComments / perPage) > currentPage;
  const hasPrevPage = currentPage > 1;

  let myPost;
  if (loadingPost) {
    myPost = <Spinner />;
  } else if (post.likes) {
    myPost = (
      <Fragment>
        <h2 className="post-title">{post.title}</h2>
        <div className="post-content">{post.content}</div>
        <div className="post-middle">
          <div className="post-author">
            <h4 style={{ fontSize: "14px", margin: "5px" }}>Post By</h4>
            <div className="author-avatar">
              <img src={post.author.avatar} alt={post.author.username} />
            </div>
            <Link to={`/users/${post.author.username}`}>
              {post.author.username}
            </Link>
          </div>

          {(user.id === post.author._id && isAuth) ||
          (user.role === "admin" && isAuth) ? (
            <div className="btn-report">
              <Button style={{ margin: "0.4rem" }} btnClass="danger p6">
                Delete
              </Button>
              <Button style={{ margin: "0.4rem" }} btnClass="success p6">
                Edit
              </Button>
            </div>
          ) : (
            <div className="btn-report">
              <Button style={{ margin: "0.4rem" }} btnClass="danger p6">
                Report
              </Button>
            </div>
          )}
          {isShare ? <Share shareTw={shareTw} shareFb={shareFb} /> : null}
        </div>
        <div className="post-actions">
          <div className="af-action">
            <Like likes={post.likes} postId={post._id} />
            <div className="af-comment">
              <p className="af-info">
                {post.totalComments}{" "}
                {post.totalComments > 1 ? "Comments" : "Comment"}
              </p>
              <button className="af-action-btn">
                <FaRegComment />
                <span> Comment</span>
              </button>
            </div>
            <div className="af-share">
              <button onClick={toggleShare} className="af-action-btn">
                <FaRegShareSquare />
                <span> Share</span>
              </button>
            </div>
          </div>
        </div>

        <Comments comments={filterComments} postId={post._id} />
        <ShowMorePagination
          label="Comment"
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          handleShowLess={handleShowLess}
          handleShowMore={handleShowMore}
        />
      </Fragment>
    );
  }
  return <div className="single-post">{myPost}</div>;
};

const mapStateToProps = ({
  post: { post, loadingPost, postError },
  auth: { user, isAuth }
}) => ({
  post,
  loadingPost,
  user,
  isAuth
});

const mapDispatchToProps = dispatch => ({
  onFetchSinglePost: postId => dispatch(actions.fetchSinglePost(postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SinglePost));
