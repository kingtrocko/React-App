'use stric';

var React = require('react');

module.exports = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="adds-block-top">
						<img className="team-banner" 
						src={"../images/team-banner/beIN_Copa_TeamPage_Header_" + this.props.teamName + ".jpg"}/>
					</div>
				</div>
			</div>
		);
	}
});