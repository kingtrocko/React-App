'use strict';

var React 	= require('react');
var Section = require("./section.jsx");

module.exports = React.createClass({

	//set sectionVideos props to empty array to avoid error in the forEach in 
  //case this value is not set from the Parent
  getDefaultProps: function()
  {
  	return {
  		sections: []
  	};
  },

  render: function() {
  	var mySections = [];

  	this.props.sections.forEach(function(item){
  		mySections.push(
  			<Section sectionVideos={item.videos} title={item.title} headerButton={item.addMoreSubmissionsButton} footerButton={item.addSeeAllButton} />
  			);
  		mySections.push(<div className="section-div"></div>);
  	});

    return (
    	<div className="container">
	        <div className="row">
	          <div className="media-list-block clearfix">

	          	{mySections}

	          </div>
	        </div>
	    </div>
    );
  }
});