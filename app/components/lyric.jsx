'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'Lyric',
	render: function() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.props.content}} />
		);
	}
});