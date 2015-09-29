'use strict';

var React	= require('react');
var ContributionsStore 	= require('../../stores/submissions.jsx');


var Row = React.createClass({
	getDefaultProps: function(){
      return {
      	  info: { id: "", name: "Not defined", size: "", type: "Not defined", url: "#", status: "", lyric: "No Lyric"}
      };
  	},

  	getInitialState: function() {
		return {
			submission_status: "Not Approved"
		};
	},

	downloadLyric: function(event) {
		event.preventDefault();
		var lyric = this.props.info.lyric;
		if (lyric == undefined || lyric == null || lyric.length == 0) {
			alert('There are no lyrics for this submission.');
			return;
		}

		var file = document.createElement('a');
		var filename;
		if (this.props.info.team === "") {
			filename = this.props.info.name + ' by ' + this.props.info.artist + '.txt';
		} else {
			filename = this.props.info.name + ' by ' + this.props.info.artist + ' (' + this.props.info.team + ').txt' ;
		}

		file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.props.info.lyric));
		file.setAttribute('download', filename);
		file.style.display = 'none';
		document.body.appendChild(file);
		file.click();
		document.body.removeChild(file);
	},

  	_handleOnClick: function(event){
  		event.preventDefault();
  		var action = event.target.parentElement.attributes['class'].value;
  		var status = action == 'accept' ? 1 : 0;
  		var rowId = $(event.target.parentElement).closest('tr').attr('id');
  		var docStatus = "";
  		
  		ContributionsStore.updateStatus(rowId, status, function(err, result){
  			if(result != 'ERROR'){
  				var selector = "#" + rowId +" .status-col";
  				$(selector).children("span").text(result);
  				
  				$(selector).children("span").removeClass("label-success label-danger");

  				if(result.toString() == "Not Approved"){
  					$(selector).children("span").addClass("label-danger")	
  				}else{
  					$(selector).children("span").addClass("label-success");	
  				}
  			}
  		});

  		//this.setProps({ info: {status: docStatus} });
  		//this.setState({submission_status: docStatus});
  	},

	render: function(){
		var submissionStatus = this.props.info.status;
		var cssClass = submissionStatus == "Approved" ? "label-success" : "label-danger";
		
		var file_type = 'audio';
		if (!(this.props.info.file_type == undefined || this.props.info.file_type == null || this.props.info.file_type.length == 0)) {
			file_type = this.props.info.file_type.slice(0, 5);
		}


		return(
			<tr id= {this.props.info.id}>
				<td className="file-type"><i className={"fa fa-file-"+file_type+"-o"}></i></td>
	            <td>{this.props.info.name}<br/>Size: {this.props.info.size}</td>
	            <td>{this.props.info.type}</td>
	            <td><a href={this.props.info.url} download={this.props.info.name + ' by ' + this.props.info.artist}>Download Media</a> &amp; <a href="#" onClick={this.downloadLyric} >Lyrics</a></td>
	            <td className="status-col">
	            	<span className={"label " + cssClass}>
	            		{submissionStatus}
	            	</span>
	            </td>
	            <td>
	              <div className="submissions-actions">
	                <a href="#"  className="accept" data-toggle="tooltip" data-placement="top" title="Approve" onClick={this._handleOnClick}>
	                	<i className="fa fa-check"></i>
	                </a>  
	                <span className="divide">|</span>
	                <a href="#" className="decline" data-toggle="tooltip" data-placement="top" title="Not Approve" onClick={this._handleOnClick}>
	                	<i className="fa fa-times"></i>
	                </a>  
	              </div>
	            </td>
	        </tr>
		);
	}
});

module.exports = Row;