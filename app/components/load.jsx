'use strict';

var React = require('react');
var Link = require('react-router').Link;
var XLSX = require('xlsx');
var MediaItemsStore = require('../stores/mediaitems.jsx');
var FecthRandomLyric = require('./fetchRandomLyric.jsx');

module.exports = React.createClass({
	displayName: 'Load',

	getInitialState: function() {
		return {
			myFileHandle: {},
			displayFetch: 'block'
		};
	},
	handleChange: function(e) {
		e.preventDefault();
		this.setState( {myFileHandle: e.target.files} );
	},
	handleClick: function(e) {
		var confirmForm = confirm('Submiting a new file will reset your database with the new file.\nContinue?');
		if (!confirmForm) {
			e.preventDefault();
		}
	},
	handleSubmit: function(e) {
		e.preventDefault();

    	var files = this.state.myFileHandle;
    	var i,f;
	  	for (i = 0, f = files[i]; i != files.length; ++i) {
		    var reader = new FileReader();
		    var name = f.name;
		    reader.onload = function(e) {
		      var data = e.target.result;

		      var workbook = XLSX.read(data, {type: 'binary'});

		      // Convert workbook to JSON
		      workbook = to_json(workbook);
		      console.log(workbook);

		      MediaItemsStore.resetDatabaseFromExcelFile(workbook, function() {
		      	alert('File was Uploaded!');
		      });

	    	};
	    	reader.readAsBinaryString(f);
		}
		this.setState( {displayFetch: 'block'} );
	},

	render: function() {
		return (

			<div className="main-content">
				<div className="container">
					<div className="row">
						<div className="main-video-block main-component-block">
							<div className="video-block-header clearfix">

								<div className="main clearfix">
									<h1>Please Select a File to Load to the Database</h1>
								</div>

								<div className="sub clearfix">
									<br/>
									<form encType="multipart/form-data" onSubmit={this.handleSubmit}>
										<input type="file" onChange={this.handleChange} className="btn btn-default required" /> <br/>
										<input type="submit" onClick={this.handleClick} className="btn btn-danger" value="LOAD FILE TO DATABASE" />
									</form>
									<br/>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}