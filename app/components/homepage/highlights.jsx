
'use strict';


var React               = require('react');
var HighlightsMiniVideo = require("./highlightsMiniVideo.jsx");

module.exports = React.createClass({

  getDefaultProps: function(){
      return {
          videos: []
      };
  },

  render: function() {
    var videoCounter = 0;
    var highlightMiniVideoNodes = eval(this.props.videos).map(function (video) {
      videoCounter++;

      var sID = video.url.replace("https://www.dailymotion.com/video/", "").trim();

      if (video.priority == "Secondary") {
        return (
          <HighlightsMiniVideo counter={videoCounter - 2} sourceURL={video.url.trim()} sourceID={sID} videoTitle={video.title} isActive="" />
        );
      }
    });

    return (
        <ul id="thumb-scroll" className="highlight-video clearfix">
          {highlightMiniVideoNodes}
        </ul>
    );
  }
});

