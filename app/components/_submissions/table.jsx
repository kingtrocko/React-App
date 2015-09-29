'use strict'

var React				= require('react');
var ContributionsStore 	= require('../../stores/submissions.jsx');
var TableRow			= require('./tableRow.jsx');

var Table = React.createClass({
	getInitialState: function() {
		return {
			submissions: []
		}
	},

	componentDidMount: function() {
		var _this = this;
		ContributionsStore.getContributionsCollection(function(err, records){
			if (_this.isMounted()) {
				_this.setState({submissions: records});
			}
		});
	},

	render: function () {
		var Rows = [];
		var sizeInMB;

	   	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

		eval(this.state.submissions).forEach(function(item){
			var bytes = item.file_size;
			if (bytes == 0) {
				sizeInMB = '0 Byte';	
			} 
			else{
				var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   			sizeInMB =  Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
			}
			var information = { 
				id: item._id, 
				name: item.name, 
				size: sizeInMB, 
				type: item.type, 
				url: item.file_url, 
				status: item.status, 
				artist: item.artist, 
				lyric: item.lyric,
				team: item.team,
				file_type: item.file_type
			};
			
			Rows.push(<TableRow info={information} />);
			//Rows.push(<TableRow name={item.name} size={sizeInMB} type={item.type} url={item.url} status={item.status} />);
			
			sizeInMB = 0;
		});

		return(
			<table className="table table-striped">
				<tbody>
              		{Rows}
              	</tbody>
    		</table>
		);
	}

});

module.exports = Table;