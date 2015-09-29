'use strict';

var React = require('react');
var MediaItemsStore = require('../../stores/mediaitems.jsx');
var http = require('http');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      thumbnail: 'http://s2.dmcdn.net/Kr8aF/x240-fhO.jpg'
    };    
  },

  handleClick: function(e) {

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    var div = $('#top-carousel').find('.item.active');
    var divPLayer = div.find("#dailymotion-main-video-player");

    if (divPLayer.length > 0){
      mainGlobalVideoPlayer.play();
      mainGlobalVideoPlayer.load(this.props.sourceID);
    } else {
      div.html('<div class="responsive-video"><div id="dailymotion-main-video-player"></div></div>');

      var iframe_div = div.find("#dailymotion-main-video-player");
      var mainVideoPlayer = DM.player(iframe_div.get(0), {video: this.props.sourceID});

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

    //$(".responsive-image.dailymotion-video-highlight").removeClass("active");

    //Remove carouse previous and next buttons
    $('.left.carousel-control').remove()
    $('.right.carousel-control').remove();

  },

  componentDidMount: function() {
    var _this = this;
    var link = 'https://api.dailymotion.com/video/' + this.props.sourceID + '?fields=thumbnail_240_url';
    $.get(link, function (data) {
      _this.setState({ thumbnail: data.thumbnail_240_url });
    });
  },

  render: function() {
    var video_title = (this.props.videoTitle == '') ? 'Video Title' : this.props.videoTitle;
    var customStyle = {};
    var customCssClass = "video-name ";
    
    if(video_title.toUpperCase() == "BEIN PROMO VIDEOS" || video_title.toUpperCase() == "BEIN PROMO VIDEO"){
      customStyle = {
                      'text-transform': 'capitalize'
                    };
      customCssClass += " customVideoName";
    }
    return (

      <div className="video-col col-md-4 col-sm-6 col-xs-12">
        <a href={window.location.hash} onClick={this.handleClick} className="responsive-image active">
          <div className="ico-play"><i className="fa fa-play"></i></div>
          <img src={this.state.thumbnail} />
          
        </a>

        <h4 style={customStyle} className={customCssClass}>{video_title}</h4>
        
      </div>

    );
  }
});