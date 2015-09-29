"use strict";

var React 					= require('react');
var Router 					= require('react-router');
var MainPlayerApp 			= require('./homepage/mainPlayerWithCarousel.jsx'); 
//("./common/mainPlayer.jsx"); 
//('./homepage/mainPlayerWithCarousel.jsx');
var Section 				= require("./common/section.jsx");
var SongsSectionContainer 	= require('./teams/songsSectionContainer.jsx');
var MediaItemsStore 		= require('../stores/mediaitems.jsx');

var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
	displayName: 'HomePage',

	getInitialState: function() {
		return {
			top5_songs: [],
			anthem_songs: [],
			anthem_videos: [],
			behind_scenes: []
		};
	},

  	componentDidMount: function() {
		var _this = this;
	    // MediaItemsStore.getMediaItemsFor("Homepage", "TOP 5 Copa America Songs", "audio", function(err, mediaItems) {

	    // 	if (_this.isMounted()) {
	    // 		_this.setState({top5_songs: mediaItems});
	    // 	}
	    // });

	    MediaItemsStore.getMediaItemsFor("Homepage", "Anthem Covers", "audio", function(err, mediaItems) {

	    	if (_this.isMounted()) {
	    		_this.setState({anthem_songs: mediaItems});
	    	}
	    });


	    MediaItemsStore.getMediaItemsFor("Homepage", "Anthem Covers", "video", function(err, mediaItems) {
	    	if (_this.isMounted()) {
	    		_this.setState({ anthem_videos: mediaItems });
	    	}
	    });

    	// MediaItemsStore.getMediaItemsFor("Homepage", "BeIN the Beat Video", "video", function(err, mediaItems) {
	    // 	if (_this.isMounted()) {
	    // 		_this.setState({ behind_scenes: mediaItems });
	    // 	}
	    // });
  	},

	render: function() {
		//<SongsSectionContainer sectionName="Copa America Songs" IDPrefix="top5-" songList={this.state.top5_songs}/>
		//<div className="section-div"></div>
		var customStyle = {'textTransform': 'capitalize'};
		return (

			<div className="main-content">    
				<MainPlayerApp hasHighlights="true" title="beIN the Beat Home" page="Homepage" classification="TOP 5 Copa America Songs" />

				<div className="container">
	       			<div className="row">
						<div className="media-list-block clearfix">

		        			<SongsSectionContainer sectionName="Anthem Covers" IDPrefix="anthems-" songList={this.state.anthem_songs}/>
		        			<div className="section-div"></div>
				 			
				 			<Section title="Video Anthem Covers" videos={this.state.anthem_videos} />
				 			<div className="section-div"></div>
				 			
				 			<div className="col-xs-12">
								<div className="behind-scenes-text">

									<h4 style={customStyle}>The beIN the Beat Project</h4>

									<p align="justify">
										Sports, music, and technology play a huge role in our lives but rarely do we get to experience and partake in all three at once. This spring, <a href="https://www.berklee.edu/focused/ice" target="_blank">the Berklee Institute for Creative Entrepreneurship (BerkleeICE)</a> and beIN SPORTS asked Boston-area students to do just that.
									</p>

									<p align="justify">
										In collaboration with beIN SPORTS, BerkleeICE students Alison Albino, Anahita Bahri, Maxwell McEwen, and Veronica Towers-Dioso organized a hackathon with the aim of finding a team to create an online platform for the network's broadcast of Copa America. The idea was to incorporate the rich chant and anthem culture of the competing soccer nations in a site that immerses beIN SPORTS Copa America viewers in soccer culture. 
									</p>
									
									<p align="justify">
										beIN SPORTS challenged Berklee and Boston-area students to create such a platform. Participants from Harvard, Babson, Berklee, and Boston University put forward ideas and solutions. The winning team, consisting of Berklee students William Kiendl and Marta Trapella, and recent Berklee graduate Evan Chapman, proposed a site aimed at bringing fans together through music, and featuring winning submissions of original Copa America songs and fan-produced national anthems from Copa America 2015 countries.
									</p>
									
									<p align="justify">
										In collaboration with beIN SPORTS, BerkleeICE, Agility Feat and AudioCommon, the Berklee students created this online platform they had prototyped at the hackathon.
									</p>

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
});

