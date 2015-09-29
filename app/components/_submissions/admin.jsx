'use strict';

var React	= require('react');
var Table	= require('./table.jsx');

var SubmissionsApp = React.createClass({
	render: function () {
		return(
			<div className="container">
				<div className="row">
		        	<div className="col-lg-12">
		          		<div className="panel panel-default panel-submissions">
		            		<div className="panel-heading">
		              			<h3 className="panel-title">Submissions</h3>
		            		</div>
		            		
		            		<Table />
		            		
		          		</div>
        			</div>
      			</div>
    		</div>
		);
	}
});

module.exports = SubmissionsApp;