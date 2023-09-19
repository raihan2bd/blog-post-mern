import React from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

import "./Share.css";

const Share = props => {
  const { shareFb, shareTw } = props;
  return (
    <div className="share-post">
      <div onClick={shareFb} className="share-item fb-color">
        <span>
          <FaFacebookSquare />
        </span>
      </div>
      <div onClick={shareTw} className="share-item tw-color">
        <span>
          <FaTwitterSquare />
        </span>
      </div>
    </div>
  );
};

export default Share;

// var twitterShare = document.querySelector('[data-js="twitter-share"]');

// twitterShare.onclick = function(e) {
//   e.preventDefault();
//   var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
//   if(twitterWindow.focus) { twitterWindow.focus(); }
//     return false;
//   }

// var facebookShare = document.querySelector('[data-js="facebook-share"]');

// facebookShare.onclick = function(e) {
//   e.preventDefault();
//   var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
//   if(facebookWindow.focus) { facebookWindow.focus(); }
//     return false;
// }

// var Example = React.createClass({
//   fbShare: function() {
//       window.open('http://www.facebook.com/sharer.php?s=100&p[title]=Fb Share&p[summary]=Facebook share popup&p[url]=javascript:fbShare("http://jsfiddle.net/stichoza/EYxTJ/")&p[images][0]="http://goo.gl/dS52U"', 'sharer', 'toolbar=0,status=0,width=548,height=325');
//   },

//   render: function() {
//       return (<div>
//           <img src="http://pasadenainstitute.com/fb-shareTransp122x42.png" onClick={this.fbShare} />
//       </div>);
//   }
// });

// ReactDOM.render(
//   <Example />,
//   document.getElementById('container')
// );
