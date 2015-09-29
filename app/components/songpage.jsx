"use strict";

var React 				= require('react');
var Router 				= require('react-router');
var MainPlayerApp 		= require('./common/mainPlayer.jsx');
var Section = require("./common/section.jsx");
var SectionCarousel = require("./common/sectionCarousel.jsx");

var SongsSectionContainer = require('./teams/songsSectionContainer.jsx');
var MediaItemsStore = require('../stores/mediaitems.jsx');

var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
	displayName: 'SongPage',

	getInitialState: function() {
		return {
			songs: [],
			music_videos: []
		};
	},

  	componentDidMount: function() {
  		var _this = this;

	    MediaItemsStore.getMediaItemsFor("Copa America Song Page", "Copa America Music Videos", "video", function(err, mediaItems) {

	    	if (_this.isMounted()) {
	    		_this.setState({music_videos: mediaItems});
	    	}
	    });
  	},

	render: function() {

		return (
			<div className="main-content">

      			<MainPlayerApp hasHighlights="false" title="Song Page" page="Copa America Song Page" classification="Featured Content" />

				<div className="container">
					<div className="row">
						<div className="media-list-block clearfix">

	      					<SectionCarousel title="Copa America Music Videos" videos={this.state.music_videos} />

	      				</div>
	      			</div>
	      		</div>

      		</div>
		);
	}
});

// Removed for carousel
// <Section title="Copa America Music Videos" videos={this.state.music_videos} />


// Copa America Songs Section Removed Temporately
// <SongsSectionContainer sectionName={"Copa America Songs"} IDPrefix="song-page-" songList={this.state.songs}/>
// <div className="section-div"></div>