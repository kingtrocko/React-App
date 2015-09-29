'use strict';

var React = require('react');
var Highlights = require("./highlights.jsx");
var MediaItemsStore = require('../../stores/mediaitems.jsx');
var MainVideo = require('../common/mainVideo.jsx');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			main_video: {title: 'Video Title', url: ''}
		};
	},

	contextTypes: {
    	router: React.PropTypes.func
  	},

	componentWillReceiveProps: function(nextProps) {
		var teamName = this.context.router.getCurrentParams().teamName.toLowerCase();
  		teamName = teamName.charAt(0).toUpperCase() + teamName.slice(1);
		var _this = this;

		MediaItemsStore.getPrimaryMediaItemFor(teamName + ' page', 'Featured Content', 'video', function (err, mediaItems) {
			var video = eval('('+mediaItems+')');
			_this.setState({
				main_video: video
			});
		});
	},

	componentDidMount: function() {
		var _this = this;

		MediaItemsStore.getPrimaryMediaItemFor(this.props.teamName + ' page', 'Featured Content', 'video', function (err, mediaItems) {
			var video = eval('('+mediaItems+')');
			_this.setState({
				main_video: video
			});
		});
	},

	render: function() {
		var video_title = (this.state.main_video.title == '') ? 'Video Title' : this.state.main_video.title;
		var siteUrl = encodeURIComponent("https://bein.herokuapp.com/");
	    var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + siteUrl;
	    var twitterUrl = "https://twitter.com/share?url=" + siteUrl + "&text=" + encodeURIComponent("Please visit beIn the beat Copa America website");
	    var googleplusUrl = "https://plus.google.com/share?url=" + siteUrl;

		return(
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
		                  <a className="video-share-facebook" href={fbUrl} target="_blank" >
		                  	<i className="fa fa-facebook"></i>
		                  </a>
		                  <a className="video-share-twitter" href={twitterUrl} target="_blank">
		                  	<i className="fa fa-twitter"></i>
		                  </a>
		                  <a className="video-share-google-plus" href={googleplusUrl} target="_blank">
		                  	<i className="fa fa-google-plus"></i>
		                  </a>
		                </div>
		              </div>
		              
		            </div>
		  
					<MainVideo video={this.state.main_video} />
		  
		          </div>
		        </div>
		      </div>
		);
	}
});