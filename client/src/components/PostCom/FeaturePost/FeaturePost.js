import React, { useState, useEffect } from "react";
import axios from "axios";

import Slider from "../../Slider/Slider";
import Spinner from "../../UI/Spinner/Spinner";
import Card from "../../UI/Card/Card";
import SingleFeaturePost from "./SingleFeaturePost/SingleFeaturePost";

const FeaturePost = ({ removeFeature }) => {
  const [featurePosts, setFeaturePost] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transFormValue, settransFormValue] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmount = false;

    const loadFeature = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/posts/feature/");
        if (!unmount) {
          setLoading(false);
          setFeaturePost(res.data.featurePosts);
        }
      } catch (err) {
        if (!unmount) {
          setLoading(false);
        }
        console.log(err.response);
      }
    };

    loadFeature();
    return () => {
      unmount = true;
    };
  }, []);

  const slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  const nextSlide = () => {
    if (currentIndex === featurePosts.length - 1) {
      setCurrentIndex(0);
      settransFormValue(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      settransFormValue(transFormValue + -slideWidth());
    }
  };

  const previousSlide = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex(currentIndex - 1);
    settransFormValue(transFormValue + slideWidth());
  };

  const removeFeaturePostHandler = async id => {
    try {
      let token = "";
      if (localStorage.getItem("token")) {
        token = JSON.parse(localStorage.getItem("token"));
      }

      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const res = await axios.delete(
        `/api/admin/remove-feature-post/${id}`,
        config
      );
      const postId = res.data.postId;
      const updatedFeaturePosts = featurePosts.filter(i => i._id !== postId);
      setFeaturePost(updatedFeaturePosts);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  let myContent = "";

  if (loading && !featurePosts) {
    myContent = <Spinner></Spinner>;
  } else if (!loading && removeFeature && featurePosts.length < 1) {
    myContent = (
      <Card>
        <h2>No Feature Post Found</h2>
      </Card>
    );
  } else if (!loading && featurePosts.length > 0 && removeFeature) {
    myContent = featurePosts.map(i => {
      return (
        <SingleFeaturePost
          key={i._id}
          {...i}
          clicked={removeFeaturePostHandler}
        />
      );
    });
  } else if (!loading && featurePosts.length > 0) {
    myContent = (
      <Slider
        currentIndex={currentIndex}
        transFormValue={transFormValue}
        featurePosts={featurePosts}
        nextSlide={nextSlide}
        previousSlide={previousSlide}
      />
    );
  }

  return <div>{myContent}</div>;
};

export default FeaturePost;
