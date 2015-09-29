'use stric';

var React = require('react');
var TeamBanner = require('./teams/teamBanner.jsx');
var MainVideoContainer = require('./teams/mainVideoContainer.jsx');
var SongsSectionContainer = require('./teams/songsSectionContainer.jsx');
var VideosSectionContainer = require('./teams/videosSectionContainer.jsx');
var MediaItemsStore = require('../stores/mediaitems.jsx');

module.exports = React.createClass({
	displayName: 'Teams',

	getInitialState: function() {
		return {
			songs: []
		};
	},

	contextTypes: {
    	router: React.PropTypes.func
  	},

  	componentWillReceiveProps: function() {
  		var teamName = this.context.router.getCurrentParams().teamName.toLowerCase();
  		teamName = teamName.charAt(0).toUpperCase() + teamName.slice(1);

  		//console.log('teamName for will recieve props is: ' + teamName);

  		var _this = this;
	    MediaItemsStore.getMediaItemsFor(teamName + " page", "Anthem Covers & Chants", "audio", function(err, mediaItems) {

	    	//console.log('songs returned by function in teams: \n' + mediaItems);
	    	if (_this.isMounted()) {
	    		_this.setState({songs: mediaItems});
	    	}
	    });

  	},

  	componentDidMount: function() {
  		var teamName = this.context.router.getCurrentParams().teamName.toLowerCase();
		teamName = teamName.charAt(0).toUpperCase() + teamName.slice(1);

  		var _this = this;
	    MediaItemsStore.getMediaItemsFor(teamName + " page", "Anthem Covers & Chants", "audio", function(err, mediaItems) {

	    	//console.log('songs returned by function in teams: \n' + mediaItems);
	    	if (_this.isMounted()) {
	    		_this.setState({songs: mediaItems});
	    	}
	    });
  	},

	render: function() {
		var teamName = this.context.router.getCurrentParams().teamName.toLowerCase();
		teamName = teamName.charAt(0).toUpperCase() + teamName.slice(1);


		return (
		    <div className="main-content">

				<div className="container">
					<div className="row">
						<div className="adds-block-top">
						</div>
					</div>
				</div>
		    
		      <MainVideoContainer teamName={teamName} />
		  
		      <div className="container">
		        <div className="row">
		          <div className="media-list-block clearfix">

		            <SongsSectionContainer sectionName="Anthem Covers &amp; Chants" IDPrefix="chants-" songList={this.state.songs}/>

		          </div>
		        </div>
		      </div>    
		    
		    </div>
		); 
	}
});

// <VideosSectionContainer title={teamName + " Chant Mashups"} videos={[{videoID: 'x2jl068', videoName: "Blatter 'Surprised' By Messi's Golden...", videoDate: "March 26 2015 | 15:57"}]} />

// <VideosSectionContainer title={teamName + " Anthems"} videos={[{videoID: 'x2jl068', videoName: "Blatter 'Surprised' By Messi's Golden...", videoDate: "March 26 2015 | 15:57"}]} />

// <VideosSectionContainer title={teamName + " Chants"} videos={[{videoID: 'x2jl068', videoName: "Blatter 'Surprised' By Messi's Golden...", videoDate: "March 26 2015 | 15:57"}]} />
