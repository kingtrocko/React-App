'use strict';

var React       = require('react');
var Highlights      = require("../homepage/highlights.jsx");
var MediaItemsStore     = require('../../stores/mediaitems.jsx');
var MainVideo = require('./mainVideo.jsx');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      highlights: [],
      main_video: {title: 'Video Title', url: ''}
    };
  },

  componentDidMount: function() {
    var _this = this;

    MediaItemsStore.getPrimaryMediaItemFor(this.props.page, this.props.classification, "video", function (err, mediaItems) {
      var video = eval('('+mediaItems+')');
      _this.setState({
        main_video: video
      });
    });

    if(this.props.hasHighlights == "true") {
      MediaItemsStore.getMediaItemsFor(this.props.page, this.props.classification, "video", function(err, mediaItems) {
        _this.setState({ highlights: mediaItems });
      });
    }
  },

  getDefaultProps: function()
  {
      return {
        hasHighlights: "false",
        title: "Title is not defined",
        name: "Video name is not defined"
      };  
  },

  render: function() {
    var HighlightsComponent = "";
    var siteUrl = encodeURIComponent("https://bein.herokuapp.com/");
    
    var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + siteUrl;
    var twitterUrl = "https://twitter.com/share?url=" + siteUrl + "&text=" + encodeURIComponent("Please visit beIn the beat Copa America website");
    var googleplusUrl = "https://plus.google.com/share?url=" + siteUrl;
    var onclickHandler = "alert('message');" //javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;";

    if(this.props.hasHighlights == "true")
    {
        HighlightsComponent = <Highlights videos={this.state.highlights} />;
    }
    var video_title = (this.state.main_video.title == '') ? 'Video Title' : this.state.main_video.title;
    //console.log("highlights are " + this.state.highlights);

    //var myVar = this.state.highlights;

    return (
     <div className="container">
        <div className="row">
          <div className="main-video-block">
            <div className="video-block-header clearfix">
              <div className="main clearfix">
                <h5></h5>
              </div>
              
              <div className="sub clearfix">
                <h2 id="main-daily-motion-video-name">{video_title}</h2>
                <div className="video-header-actions">
                  <a className="video-share-facebook" href={fbUrl} 
                    onclick={onclickHandler} target="_blank">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a className="video-share-twitter" href={twitterUrl} 
                      target="_blank" onclick={onclickHandler}>
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="video-share-google-plus" href={googleplusUrl} 
                      target="_blank" onclick={onclickHandler}>
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div> 
            </div>
            
            <MainVideo video={this.state.main_video} />

            {HighlightsComponent}

          </div>
        </div>
      </div>      
    );
  }
});