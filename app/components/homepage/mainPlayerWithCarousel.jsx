'use strict';

var React           = require('react');
var Highlights      = require("../homepage/highlights.jsx");
var MediaItemsStore = require('../../stores/mediaitems.jsx');
var MainVideos      = require('./mainVideosWithCarousel.jsx');
var allMainVideos   = [];
module.exports = React.createClass({

  getInitialState: function() {
    return {
      highlights: [],
      main_video: {title: 'Video Title', url: ''}
    };
  },

  componentDidMount: function() {
    var _this = this;
    
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
        name: "Video name is not defined",
        thumbnailUrl: "",
        mVideos: []

      };  
  },

  render: function() {
    var _this = this;
    var HighlightsComponent = "";
    var myVideos = [];
    var counter = 0;
    var nameOfFirstVideo = "";
    var siteUrl = encodeURIComponent("https://bein.herokuapp.com/");
    var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + siteUrl;
    var twitterUrl = "https://twitter.com/share?url=" + siteUrl + "&text=" + encodeURIComponent("Please visit beIn the beat Copa America website");
    var googleplusUrl = "https://plus.google.com/share?url=" + siteUrl;
    //var onclickHandler = "javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;";

    if(this.props.hasHighlights == "true")
    {
        HighlightsComponent = <Highlights videos={this.state.highlights} />;
    }      

    eval(this.state.highlights).forEach(function(videoItem){
      var activeClass = "";
      if(videoItem.priority == "Secondary"){
        if(counter == 0){
          activeClass = "active";
          nameOfFirstVideo = videoItem.title;
        }
        myVideos.push(<MainVideos index={counter} videoName={videoItem.title} sourceUrl={videoItem.url.trim()} cssActiveClass={activeClass} />);
        counter++;
      }
    });

    var video_title = (this.state.main_video.title == '') ? 'Video Title' : this.state.main_video.title;

    
    //console.log("myVideos length en RENDER is " + eval(myVideos).length);

    return (
     <div className="container">
        <div className="row">
          <div className="main-video-block">
            <div className="video-block-header clearfix">
              <div className="main clearfix">
                <h5></h5>
              </div>
              
              <div className="sub clearfix">
                <h2 id="main-daily-motion-video-name">{nameOfFirstVideo}</h2>
                <div className="video-header-actions">
                  <a className="video-share-facebook" href={fbUrl} target="_blank">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a className="video-share-twitter" href={twitterUrl} target="_blank">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="video-share-google-plus" href={googleplusUrl} target="_blank" >
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div> 

            </div>
            
            <div className="carousel slide main-video-window" id="top-carousel" >
              <div className="carousel-inner">
                {myVideos}
              </div>

              <a className="left carousel-control" href="#top-carousel" role="button" data-slide="prev">
                <svg version="1.1" viewBox="0 0 24 24" preserveAspectRatio="xMinYMin meet" className="mTSButtonIcon">
                  <g>
                    <line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
                  </g>
                  <path d="M17.279 20.902c0.322 0.325 0.322 0.85 0 1.175s-0.841 0.325-1.163 0l-9.396-9.488c-0.322-0.325-0.322-0.851 0-1.175l9.396-9.49c0.322-0.325 0.841-0.325 1.163 0s0.322 0.85 0 1.175l-8.568 8.902 8.568 8.902z" path=""></path>
                </svg>
              </a>
              <a className="right carousel-control" href="#top-carousel" role="button" data-slide="next">
                <svg version="1.1" viewBox="0 0 24 24" preserveAspectRatio="xMinYMin meet" className="mTSButtonIcon">
                  <g>
                    <line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
                  </g>
                  <path d="M6.72 20.902c-0.322 0.325-0.322 0.85 0 1.175s0.841 0.325 1.163 0l9.396-9.488c0.322-0.325 0.322-0.851 0-1.175l-9.396-9.49c-0.322-0.325-0.841-0.325-1.163 0s-0.322 0.85 0 1.175l8.568 8.902-8.568 8.902z"  path=""></path>
                </svg>
              </a>
            </div>

            {HighlightsComponent}
           
          </div>
        </div>
      </div>      
    );
  }
});