'use strict';

var React               = require('react');
var HighlightsMiniVideo = require("./highlightsMiniVideo.jsx");

module.exports = React.createClass({

  render: function() {
    // var id_counter = 0;
    // console.log(this.props.videos);
    // console.log(typeof(this.props.videos));
    // var highlightMiniVideoNodes = eval(this.props.videos).map(function (video) {

    //   id_counter++;
    //   var sID = video.url.replace("https://www.dailymotion.com/embed/video/", "").trim();

    //   if (video.priority == "Secondary") {
    //     return (
    //       <HighlightsMiniVideo id={"highlight-video-" + id_counter} sourceID={sID} name={video.fileName} isActive="active" />
    //     );
    //   }

    // });

    return (
        <div className="highlight-video clearfix">
          <HighlightsMiniVideo id="highlight-video-1" sourceURL="https://www.dailymotion.com/embed/video/x2m9fgk" sourceID="x2m9fgk" name="Sports stars react to Lahm..." isActive="active" />
          <HighlightsMiniVideo id="highlight-video-2" sourceURL="https://www.dailymotion.com/embed/video/x2jl068" sourceID="x2jl068" name="Blatter 'Surprised' By Messi's Golden..." isActive="active" />
          <HighlightsMiniVideo id="highlight-video-3" sourceURL="https://www.dailymotion.com/embed/video/x1d0zqw" sourceID="x1d0zqw" name="Brazil Coach Scolari Resigns" isActive="active" />
        </div>
    );
  }
});