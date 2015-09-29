'use strict';

var React = require('react');
var VideoContainer = require('./videoContainer.jsx');
var SectionNavigation = require('./sectionNavigation.jsx');

module.exports = React.createClass({

	render: function() {
		return (
			<section>
				<div className="section-header">
					<h2>{this.props.title}</h2>  
				</div>

				<VideoContainer source={this.props.videos[0].videoID} date={this.props.videos[0].videoDate} name={this.props.videos[0].videoName} />
				<VideoContainer source={this.props.videos[0].videoID} date={this.props.videos[0].videoDate} name={this.props.videos[0].videoName} />
				<VideoContainer source={this.props.videos[0].videoID} date={this.props.videos[0].videoDate} name={this.props.videos[0].videoName} />
				<VideoContainer source={this.props.videos[0].videoID} date={this.props.videos[0].videoDate} name={this.props.videos[0].videoName} />
				<VideoContainer source={this.props.videos[0].videoID} date={this.props.videos[0].videoDate} name={this.props.videos[0].videoName} />
				<VideoContainer source={this.props.videos[0].videoID} date={this.props.videos[0].videoDate} name={this.props.videos[0].videoName} />

				<SectionNavigation />
				<div className="section-div"></div>
			</section>

		);
	}
});