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

    MediaItemsStore.getThumbnailLink(this.props.sourceURL, function (err, link) {
      var imageJSON = eval('('+link+')');
      var imageURL = imageJSON.thumbnail_url;

      _this.setState({
        thumbnail: imageURL
      });
    });

  },

  handleClick: function(e) {
    e.preventDefault();
    mainGlobalVideoPlayer.play();
    mainGlobalVideoPlayer.load(this.props.sourceID);
  },

  render: function() {
    var cssClassString = "responsive-video " + this.props.isActive;

    return (

      <div className="video-col col-md-3 col-sm-4 col-xs-6">
        <a onClick={this.handleClick} href="#" className="responsive-image active">
          <div className="ico-play"><i className="fa fa-play"></i></div>
          <img src={this.state.thumbnail} />
        </a>
        <h4 className="video-name">Sports stars react to Lahm...</h4>
      </div>

    );
  }
});