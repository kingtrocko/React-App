'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function() {
		return (
			<div className="video-col col-md-4 col-sm-6 col-xs-12">
				<div className="responsive-video">
					<iframe frameborder="0" data-src={"https://www.dailymotion.com/embed/video/" + this.props.source} allowfullscreen></iframe>
				</div>
				<span className="date">{this.props.date}</span>
				<h4 className="video-name">{this.props.name}</h4>
			</div>
		);
	}
});