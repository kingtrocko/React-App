'use strict';

var React = require('react');
var VideoCarousel = require("./videoCarousel.jsx");

module.exports = React.createClass({

  render: function() {
    var videos = eval(this.props.videos);
    var videoCounter = -1;


    var VideoNodes = videos.map(function (video) {
      videoCounter++;

      var sID = video.url.replace("https://www.dailymotion.com/video/", "").trim();

      return ( <VideoCarousel sourceURL={video.url.trim()} sourceID={sID} videoTitle={video.title.trim()} counter={videoCounter} /> );
    });

    return (
      <section>
        <div className="section-header">
          <h2>{this.props.title}</h2>
        </div>
        
        <ul id="thumb-scroll" className="highlight-video section-carousel clearfix">

          {VideoNodes}

        </ul>

      </section>
    );
  }
});