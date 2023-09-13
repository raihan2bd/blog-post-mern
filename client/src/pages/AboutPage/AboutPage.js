import React from "react";
import bg from "../../assets/images/about-page-bg.jpg";

import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div
        style={{
          background: `url(${bg})`,
          backgroundAttachment: "fixed"
        }}
        className="about-wrapper"
      >
        <div className="about-main">
          <h3 className="about-title">Who we are?</h3>
          <article className="about-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius qui
              voluptatem aspernatur, praesentium necessitatibus similique non
              debitis tempora at! Nemo voluptate quidem iste unde doloremque
              voluptas dicta eveniet neque sit? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Maiores tempore aliquid ratione
              quisquam quae ducimus voluptatibus unde repellat quia provident?
              Tenetur beatae consequuntur obcaecati itaque dicta quod natus qui
              quasi.
            </p>
          </article>
        </div>
        <article className="about-main">
          <h3 className="about-title">Why we are?</h3>
          <div className="about-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius qui
              voluptatem aspernatur, praesentium necessitatibus similique non
              debitis tempora at! Nemo voluptate quidem iste unde doloremque
              voluptas dicta eveniet neque sit? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Cum molestias expedita, fuga
              commodi nesciunt eligendi, minima minus, quae doloremque nulla
              distinctio voluptates quo. Natus sequi veritatis qui nulla iure
              dolorum!
            </p>
          </div>
        </article>
        <article className="about-main">
          <h3 className="about-title">Our goal</h3>
          <div className="about-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius qui
              voluptatem aspernatur, praesentium necessitatibus similique non
              debitis tempora at! Nemo voluptate quidem iste unde doloremque
              voluptas dicta eveniet neque sit? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam temporibus cumque quibusdam
              quos ipsa error repellendus eligendi tenetur obcaecati vitae
              labore, nihil neque architecto laboriosam? Rem nostrum totam non
              reprehenderit.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default AboutPage;
