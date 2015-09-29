'use strict';

var React = require('react/addons');
var Router = require('react-router');
var TransitionGroup = React.addons.CSSTransitionGroup;
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
	mixins: [ Router.State ],

	render: function() {
		var name = this.getPath();

		return (
			<div>
				<TransitionGroup component="div" transitionName="example">
					<RouteHandler key={name} />
				</TransitionGroup>
			</div>
		);
	}
});