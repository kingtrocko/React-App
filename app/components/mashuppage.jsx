"use strict";

var React 				= require('react');
var Router 				= require('react-router');
var MainPlayerApp 		= require('./common/mainPlayer.jsx');
var SectionsContainer 	= require("./common/sectionsContainer.jsx");
var AudioCommonStore	= require('../stores/audiocommon.jsx');

var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
	displayName: 'Mashups',

	getInitialState: function() {
		return {
			trackList: [],
			trackID: '12704',
			trackName: 'Argentina',
			artistName: 'Ripe',
			artistBio: 'Ripe is a Pop/Funk band out of Boston, MA that was born out of its 7 members shared belief that, with enough passion behind it, music can still make the earth shake. With one eye looking back to the birth of funk and psychedelic music, and the other looking forward with a modern idea of what makes people move, Ripe seeks both to honor musical history, as well as to make it. Having a strong devotion towards creating unforgettable live experiences, Ripe\'s main priority is to make people move and live in the moment. From the Ripe family, they ask you to get loose, get down, and get ready: the party is just getting started.',
			selectedTrack: 'Select a Song',
			trackURL: 'https://www.audiocommon.com/Artist/Player/12704?view=bein'
		};
	},

	handleTrackChange: function(event) {

		event.preventDefault();

		var _this = this;
		var trackID = event.target.attributes.value.value;
		var trackName = event.target.innerHTML;

		AudioCommonStore.getTrackInfo(trackID, function (error, track) {
			var trackJSON = eval('('+track+')');

			var trackName = (trackJSON.SongTitle == null) ? 'No track name info yet' : trackJSON.SongTitle;
			var artistName = (trackJSON.ArtistName == null) ? 'No artist info for current track yet' : trackJSON.ArtistName;
			var artistBio = (trackJSON.ArtistBio == null) ? 'No bio info for current artist yet' : trackJSON.ArtistBio;

			_this.setState({
				trackName: trackName,
				artistName: artistName,
				artistBio: artistBio,
				trackID: trackID,
				selectedTrack: trackName,
				trackURL: 'https://www.audiocommon.com/Artist/Player/' + trackID + '?view=bein'
			});

		});
	},

	componentDidMount: function() {

		var _this = this;

		AudioCommonStore.getTrackList(function (error, trackList) {

			var list = eval(trackList);

			var listNodes = list.map(function (track) {
				return ( <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" value={track.SongID} onClick={_this.handleTrackChange}>{track.SongName}</a></li> );
			});

			_this.setState({
				trackList: listNodes
			});
		});
	},

	render: function() {
		var siteUrl = encodeURIComponent("https://bein.herokuapp.com/");    
		var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + siteUrl;
    	var twitterUrl = "https://twitter.com/share?url=" + siteUrl + "&text=" + encodeURIComponent("Please visit beIn the beat Copa America website");
    	var googleplusUrl = "https://plus.google.com/share?url=" + siteUrl;
    	var onclickHandler = "javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;";


		return (
			<div className="main-content">

				<div className="container">
					<div className="row">
						<div className="adds-block-top">
							<img className="team-banner" 
							src="../images/AudioCommonWebBanner4_lossy30.gif" />
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
					  <div className="main-video-block main-component-block">
					    
					    <div className="video-block-header clearfix">
					      
					      <div className="main clearfix">
					        <h5></h5>
					      </div>
					      
					      <div className="sub clearfix">
					        <div className="select-mashup-track">

					        	<div className="dropdown">
  								    <button className="btn btn-audiocommon dropdown-toggle" type="button" data-toggle="dropdown" id="track-name" aria-expanded="true">
  								      {this.state.selectedTrack}
  								      <span className="caret"></span>
  								    </button>
  								    <ul className="dropdown-menu" role="menu" aria-labelledby="track-name">
  										{this.state.trackList}
  								    </ul>
                    </div>

					        </div>
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

					      <div className="main-component-window clearfix">
					        <div className="mashup-component col-sm-12">
					          <div className="col-md-4">
					            <div className="track-info">
					              <h4>{this.state.trackName}</h4>
					              <span className="artist-name">{this.state.artistName}</span>
					              <p className="artist-bio">{this.state.artistBio}</p>
					            </div>
					          </div>
					          <div className="col-md-8">
					            <iframe src={this.state.trackURL}></iframe>

					          </div>
					        </div>
					      </div>


					  </div>
					</div>
				</div>

			</div>
		);
	}
});
// src={'https://www.audiocommon.com/Artist/Player/' + this.state.trackID }
// https://www.audiocommon.com/Artist/Player/12698?view=bein
