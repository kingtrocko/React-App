'use strict';

var React = require('react');
var MediaItemsStore = require('../../stores/mediaitems.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      thumbnail: ''
    };    
  },

  handleClick: function(e) {

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var divPLayer = document.getElementById("dailymotion-main-video-player");

    if (divPLayer != null) {
      mainGlobalVideoPlayer.play();
      mainGlobalVideoPlayer.load(this.props.sourceID);
    } else {
      var div = document.getElementById("top-carousel");
      div.innerHTML = '<div class="responsive-video"><div id="dailymotion-main-video-player"></div></div>';

      var iframe_div = document.getElementById("dailymotion-main-video-player");
      var mainVideoPlayer = DM.player(iframe_div, {video: this.props.sourceID});

      mainVideoPlayer.addEventListener('play', onMainPlayerStart, false);
      mainGlobalVideoPlayer = mainVideoPlayer;
      mainGlobalVideoPlayer.play();
    }

    var videoNameDiv = document.getElementById("main-daily-motion-video-name");
    videoNameDiv.innerHTML = (this.props.videoTitle == "") ? 'Video Title' : this.props.videoTitle;

    var highlights = document.getElementsByClassName('dailymotion-video-highlight');
    for (var i = 0; i < highlights.length ; i++) {
      highlights[i].className="responsive-image dailymotion-video-highlight";
    }
  },

  componentDidMount: function() {
    var _this = this;
    var link = 'https://api.dailymotion.com/video/' + this.props.sourceID + '?fields=thumbnail_240_url';
    $.get(link, function (data) {
      _this.setState({ thumbnail: data.thumbnail_240_url });
    });

    if (this.isMounted()) {
      $("#thumb-scroll").mThumbnailScroller({
        type:"click-50",
        theme:"buttons-out"
      });
    }
  },

  render: function() {
    var video_title = (this.props.videoTitle == '') ? 'Video Title' : this.props.videoTitle;

    return (

      <li className="video-col col-md-4 col-sm-6 col-xs-12" data-slide-to={this.props.counter}>
        <a href={window.location.hash} onClick={this.handleClick} className="responsive-image active" data-slide-to={this.props.counter}>
          <div className="ico-play"><i className="fa fa-play"></i></div>
          <img src={this.state.thumbnail} />
          
        </a>

        <h4 className="video-name">{video_title}</h4>
        
      </li>

    );
  }
});