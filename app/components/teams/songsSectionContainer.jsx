'use strict';

var React = require('react');
var SongContainer = require('./songContainer.jsx');
var SectionNavigation = require('./sectionNavigation.jsx');
var MediaItemsStore = require('../../stores/mediaitems.jsx');

module.exports = React.createClass({
	render: function() {

		var id_counter = 0;
		var songs = eval(this.props.songList);
		var _this = this;

		var songContainerNodes = songs.map(function (audio) {

			id_counter++;
			return ( <SongContainer id={_this.props.IDPrefix + "soundcloud-song-" + id_counter} source={audio.url.trim()} lyricURL={audio.lyric.trim()} /> );

		});

		if (songContainerNodes.length > 0) {
			return (
				<section>
					<div className="section-header">
						<h2>{this.props.sectionName}</h2>  
					</div>

					{songContainerNodes}
				</section>
			);
		} else {
			return (
				<section>  </section>
			);
		}
	}
});