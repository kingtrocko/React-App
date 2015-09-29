'use strict';

var React = require('react');
var Video = require("./video.jsx");

module.exports = React.createClass({

  render: function() {
    var videos = eval(this.props.videos);


    var VideoNodes = videos.map(function (video) {
      var sID = video.url.replace("https://www.dailymotion.com/video/", "").trim();
      return ( <Video sourceURL={video.url.trim()} sourceID={sID} videoTitle={video.title.trim()} /> );
    });

    return (
      <section>
        <div className="section-header">
          <h2>{this.props.title}</h2>
        </div>
        
        {VideoNodes}

      </section>
    );
  }
});