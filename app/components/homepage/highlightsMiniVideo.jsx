'use strict';

var React = require('react');
var MediaItemsStore = require('../../stores/mediaitems.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      thumbnail: ""
    };
  },

  componentDidMount: function() {
    var _this = this;
    var link = 'https://api.dailymotion.com/video/' + this.props.sourceID + '?fields=thumbnail_240_url';
    $.get(link, function (data) {
      _this.setState({ thumbnail: data.thumbnail_240_url });
    });

      $("#thumb-scroll").mThumbnailScroller({
        type:"click-50",
        theme:"buttons-out"
      });

  },

  handleClick: function(e) {
    var div = $('#top-carousel').find('.item.active');

    var divPLayer = div.find("#dailymotion-main-video-player");

    if (divPLayer.length > 0) {
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
    videoNameDiv.innerHTML = this.props.videoTitle;

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // $(".responsive-image.dailymotion-video-highlight").removeClass("active");

    // var clickedMiniVideo = $(e.target.parentElement.parentElement);
    // clickedMiniVideo.addClass("active");

    var highlights = document.getElementsByClassName('dailymotion-video-highlight');
    for (var i = 0; i < highlights.length ; i++) {
      if (highlights[i].nextSibling.innerHTML == this.props.videoTitle) {
        highlights[i].className="responsive-image dailymotion-video-highlight active";
      } else {
        highlights[i].className="responsive-image dailymotion-video-highlight";
      }
    }

    //Remove carouse previous and next buttons
    $('.left.carousel-control').remove();
    $('.right.carousel-control').remove();
    

      // var myCarousel = $('#top-carousel');
      // var myCarouselChild = myCarousel.children().get(0);

      // var firstChildOfCarousel = myCarouselChild.nodeName;
      // var cssClassOfFirstChildOfCarousel = myCarouselChild.attributes["class"].value;

      // if(firstChildOfCarousel == "DIV" && cssClassOfFirstChildOfCarousel == "carousel-inner")
      // {
      //     var div = $('#top-carousel').find('.item.active');
      //     var indexOfClickedHighlightVideo = e.currentTarget.attributes["data-slide-to"].value;
      //     var indexOfActiveMainVideo = div.attr("data-index");
      //     //var indexesAreEquals = indexOfClickedHighlightVideo == indexOfActiveMainVideo ? true : false;

      //     if(indexOfClickedHighlightVideo == indexOfActiveMainVideo)
      //     {
      //       var firstChild = div.children().get(0);
      //       var firstChildTagName = firstChild.nodeName;
      //       var hasClass = firstChild.attributes["class"].value == 'responsive-video' ? true : false;

      //       //verify if the DM player is in place within the active item in the carousel
      //       if(firstChildTagName != "DIV" && !hasClass)
      //       {
      //         div.html('<div class="responsive-video"><div class="dailymotion-main-video-player"></div></div>');
      //         var iframe_div = div.find(".dailymotion-main-video-player");
      //         var mainVideoPlayer = DM.player(iframe_div.get(0), {video: this.props.sourceID});

      //         mainVideoPlayer.addEventListener('play', onMainPlayerStart, false);
      //         mainGlobalVideoPlayer = mainVideoPlayer;
      //         mainGlobalVideoPlayer.play();
      //       }
      //     }
      //     else
      //     {
      //       //TODO: pause the previous video in the carousel
      //       $('#top-carousel').carousel(parseInt(indexOfClickedHighlightVideo));
      //     }
      // }

  },

  render: function() {
  	var cssClassString = "responsive-video " + this.props.isActive;
    var active = (this.props.counter == 0) ? "active" : "" ;


    return (
          <li className="video-col col-md-3 col-sm-4 col-xs-6" data-target="#top-carousel" data-slide-to={this.props.counter}>
            <a onClick={this.handleClick} href={window.location.hash} data-slide-to={this.props.counter} className={"responsive-image dailymotion-video-highlight " + active}>
              <div className="ico-play"><i className="fa fa-play"></i></div>
              <img src={this.state.thumbnail} />
            </a>
            <h4 className="video-name">{this.props.videoTitle}</h4>
          </li>
    );
  }
});