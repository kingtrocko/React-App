'use strict';

var React = require('react');
var ContributionStore = require('../stores/contribution.jsx');
var SubmissionsStore = require('../stores/submissions.jsx');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			showAlert: false,
			showCountry: true,
			name: '',
			artist: '',
			lyric: '',
			accept_terms: false,
			input_errors: [],
			loading: false,
			load_progress: 0,
			file_ready: false,
			file_name: '',
			file_type: ''
		};
	},

	onProgress: function(percentLoaded) {
		if (!this.state.loading) { 
			this.setState({
				loading: true
			}); 
		}

		this.setState({ load_progress: percentLoaded });
	},

	onUploadFinish: function(url, file) {
		document.getElementById('file_url').value = url;
		document.getElementById('file_type').value = file.type;
		document.getElementById('file_size').value = file.size;
		var filename = file.name;
		var filetype = file.type.slice(0, 5);

		this.setState({
			loading: false,
			load_progress: 0,
			file_name: filename,
			file_type: filetype,
			file_ready: true
		});
	},

	upload_file: function(file, signed_request, url) {
		var _this = this;

		var xhr = new XMLHttpRequest();
		xhr.open("PUT", signed_request);
		xhr.setRequestHeader('x-amz-acl', 'public-read');
		xhr.onload = function() {
		    if (xhr.status === 200) {
		        _this.onUploadFinish(url, file);
		    }
		};
		xhr.onerror = function() {
		    alert("Could not upload file."); 
		};
		xhr.upload.onprogress = function(e) {
            var percentLoaded;
            if (e.lengthComputable) {
                percentLoaded = Math.round((e.loaded / e.total) * 100);
                return _this.onProgress(percentLoaded);
            }
        };
		xhr.send(file);
	},

	get_signed_request: function(file) {
		var _this = this;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
		xhr.onreadystatechange = function(){
		    if(xhr.readyState === 4){
		        if(xhr.status === 200){
		            var response = JSON.parse(xhr.responseText);
		            _this.upload_file(file, response.signed_request, response.url);
		        }
		        else{
		            alert("Could not get signed URL.");
		        }
		    }
		};
		xhr.send();
	},

	handleAlertDismiss: function() {
		this.setState({ showAlert: false });
	},

	handleClearForm: function(event) {
		if (event != null) { event.preventDefault(); }
		
		document.getElementById('name').value = "";
		document.getElementById('artist').value = "";
		document.getElementById('lyric').value = "";
		document.getElementById('accept_terms').checked = false;
		if (this.state.showCountry) { document.getElementById('team').value = ""; }

		var radios = document.getElementsByName('type');
		for (var i = 0;  i < radios.length; i++) {
			radios[i].checked = false;
		}

		this.setState({ 
			showCountry: true,
			input_errors: []
		});

		document.body.scrollTop = document.documentElement.scrollTop = 0;
	},

	handleFileChange: function() {
		return alert('Submissions are no longer being accepted.');

		var files = document.getElementById('file_input').files;
		var file = files[0];
		if (file == null) {
			alert('No file selected.');
			return;
		}
		if (!(file.type == 'video/quicktime' || file.type == 'video/mp4' || file.type == 'audio/mp3' || file.type == 'audio/mpeg')) {
			alert('Unsupported file format.\n\nMake sure your file format is one of the following: .mp3, .mp4, .mov');
			return;
		}
		// if (file.size > 4194304) {
		// 	alert('Sorry, the file you are trying to upload exceeds the file size limit (4 MB).\n\nTry uploading another file.');
		// 	return;
		// }

		this.get_signed_request(file);
	},

	handleFileClear: function(event) {
		if (event != null) { event.preventDefault(); }

		document.getElementById('file_url').value = "";
		document.getElementById('file_type').value = "";
		document.getElementById('file_size').value = "";
		this.setState({
			file_ready: false,
			file_name: '',
			file_type: ''
		});
	},

	handleSubmit: function(event) {
		event.preventDefault();
		this.handleClearForm();
		this.handleFileClear();
		return alert('Submissions are no longer being accepted.');

		var _this = this;
		event.preventDefault();
		if (this.state.loading) {
			event.preventDefault();
			alert('Your file is still loading, please wait until is ready to submit this form.');
			return;
		}
		var errors = [];

		var radios = document.getElementsByName('type');
		var radio_selected = false;
		var selected_type;
		for (var i = 0;  i < radios.length; i++) {
			if (radios[i].checked === true) {
				radio_selected = true;
				selected_type = radios[i].value;
				break;
			}
		}

		if (!radio_selected) { errors.push('You must select a Type'); }
		if (document.getElementById('name').value === "") { errors.push('Name can\'t be blank.'); }
		if (document.getElementById('artist').value === "") { errors.push('Artist can\'t be blank.'); }
		if (this.state.showCountry && document.getElementById('team').value === "") { errors.push('You must select a team.'); }
		if (document.getElementById('file_url').value === "") { errors.push('You haven\'t choosen a file.'); }
		if (document.getElementById('accept_terms').checked === false) { errors.push('You must accept the Terms and Conditions.'); }

		if (errors.length > 0) {
			event.preventDefault();
			this.setState({ input_errors: errors });
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		} else {
			this.setState({ input_errors: [] });
			var submission = {
				type: selected_type,
				name: document.getElementById('name').value,
				artist: document.getElementById('artist').value,
				team: (this.state.showCountry) ? document.getElementById('team').value : null,
				file_url: document.getElementById('file_url').value,
				file_type: document.getElementById('file_type').value,
				file_size: document.getElementById('file_size').value,
				lyric: document.getElementById('lyric').value
			};

			SubmissionsStore.createSubmission(submission, function() {
				_this.handleClearForm();
				_this.handleFileClear();
				_this.setState({ showAlert: true });
			});
		}
	},

	handleTypeChange: function(event) {
		if (event.target.value === 'National Team Anthem Cover' || event.target.value === 'National Team Chant') {
			this.setState({ showCountry: true });
		} else {
			this.setState({ showCountry: true });
		}
	},

	render: function() {

		var accepted_audio = '<span>Accepted Audio Files: <strong>.mp3</strong></span>';
		var accepted_video = '<span>Accepted Video Files: <strong>.mp4, .mov</strong></span>';
		var max_file_size  = '<span>Max. file size: <strong>4 MB</strong></span>';

		var htmlForAlert;
		if (this.state.showAlert) {
			htmlForAlert = (
				<div id="contrib-alert" className="alert alert-success alert-dismissible top-fixed drop-shadow" role="alert">
					<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleAlertDismiss} ><span aria-hidden="true">&times;</span></button>
					<strong>Thank You</strong> <br/>Your contribution was submitted succesfully.
				</div>
			);
		}

		var htmlForErrors;
		if (this.state.input_errors.length > 0) {
			var htmlErrors = this.state.input_errors.join(' <br/> ');
			var errors = this.state.input_errors.map(function (error) {
				return (
					<li>{error}</li>
				);
			});
			htmlForErrors = (
				<div className="alert alert-danger" role="alert">
					<ul>{errors}</ul>
				</div>
			);
		}

		var htmlForCountry;
		if (this.state.showCountry) {
			htmlForCountry = (
				<div className="form-group">
					<label className="col-sm-2 control-label form-label">Team</label>
					<div className="col-sm-10">
						<select className="form-control" name="team" id="team" defaultValue="- Select a Team -" >
							<option value="" disabled>- Select a Team -</option>
							<option>Argentina</option>
							<option>Bolivia</option>
							<option>Brazil</option>
							<option>Chile</option>
							<option>Colombia</option>
							<option>Ecuador</option>
							<option>Jamaica</option>
							<option>Mexico</option>
							<option>Paraguay</option>
							<option>Perú</option>
							<option>Uruguay</option>
							<option>Venezuela</option>
						</select>
					</div>
				</div>				
			);
		}

		var htmlForProgressBar;
		if (this.state.loading) {
			htmlForProgressBar = (
				<div className="progress" style={{marginTop: '10px'}}>
					<div className="progress-bar" role="progressbar" aria-valuenow={this.state.load_progress} aria-valuemin="0" aria-valuemax="100" style={{width: this.state.load_progress+'%', backgroundColor: '#674172'}}>
						{this.state.load_progress + '%'}
					</div>
				</div>
			);
		}

		var htmlForFileDetails;
		if (this.state.file_ready) {
			htmlForFileDetails = (
				<div className="file-details">
					<div className="i"><i className={"fa fa-file-" + this.state.file_type + "-o"}></i></div>
					<span><span style={{display: 'inline'}}>{this.state.file_name}</span><a href="#" onClick={this.handleFileClear}><sup> Clear</sup></a></span>
				</div>
			);
		}

		return (

			<div className="main-content">    
				<div className="container">
					<div className="row">
						<div className="contribute-panel main-video-block clearfix">

							<div className="video-block-header clearfix">
								<div className="main clearfix">
									<h1>Contribute</h1>
								</div>
							</div>

							<div className="col-sm-12">

								<form className="form-horizontal" onSubmit={this.handleSubmit} >

									<div className="alert alert-warning" role="alert">
										<ul><li>Thank you all who contributed with your creations, we are no longer accepting submissions.</li></ul>
									</div>

									{htmlForErrors}

									<div className="form-group">
										<label className="col-sm-2 control-label form-label">Type</label>
										<div className="col-sm-10">

											<div className="radio radio-info radio-inline">
												<input type="radio" id="type_02" value="National Team Anthem Cover" name="type" onChange={this.handleTypeChange} />
												<label htmlFor="type_02">National Team Anthem Cover</label>
											</div>

											<div className="radio radio-info radio-inline">
												<input type="radio" id="type_03" value="National Team Chant" name="type" onChange={this.handleTypeChange} />
												<label htmlFor="type_03">National Team Chant</label>
											</div>

										</div>
									</div>

									<div className="form-group">
										<label className="col-sm-2 control-label form-label">Name</label>
										<div className="col-sm-10">
											<div className="input-group">
												<div className="input-group-addon"><i className="fa fa-pencil"></i></div>
												<input type="text" className="form-control" id="name" placeholder="Enter a name for your contribution" name="name" />
											</div>
										</div>
									</div>

									<div className="form-group">
										<label className="col-sm-2 control-label form-label">Artist</label>
										<div className="col-sm-10">
											<div className="input-group">
												<div className="input-group-addon"><i className="fa fa-pencil"></i></div>
												<input type="text" className="form-control" placeholder="Enter your artist name" id="artist" name="artist" />
											</div>
										</div>
									</div>

									{htmlForCountry}

									<div className="form-group">
										<label className="col-sm-2 control-label form-label">File</label>
										<div className="col-sm-10">

											<div className="fileUpload btn btn-default">
												<span>Browse File</span>
												<input type="file" accept="audio/mp3,video/mp4,video/quicktime,.mov" className="upload" id="file_input" onChange={this.handleFileChange} />
												<input type="hidden" name="file_url" id="file_url" />
												<input type="hidden" name="file_type" id="file_type" />
												<input type="hidden" name="file_size" id="file_size" />
											</div>

											<div className="file-info">
												<i className="fa fa-info-circle"></i>
												<div className="info-text">
													<p style={{marginBottom: '0'}} dangerouslySetInnerHTML={{__html: accepted_audio}} />
													<p style={{marginBottom: '0'}} dangerouslySetInnerHTML={{__html: accepted_video}} />
												</div>
											</div>

											{htmlForProgressBar}

											{htmlForFileDetails}

										</div>

									</div>

									<div className="form-group">
										<label className="col-sm-2 control-label form-label">Lyrics</label>
										<div className="col-sm-10">
											<textarea className="form-control" rows="3" id="lyric" name="lyric" placeholder="Enter the lyrics for the audio / video file" ></textarea>
										</div>
									</div>
	                
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10 checkbox checkbox-primary padding-l-35">
											<input id="accept_terms" type="checkbox" name="accept_terms" />
											<label htmlFor="accept_terms">I accept the <a href="http://www.beinsports.tv/terms-of-use" target="_blank">Terms and Conditions</a></label>
										</div>
									</div>
	                
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10">
											<button type="submit" className="btn btn-primary pull-right">Submit</button> 
											<a href="#" onClick={this.handleClearForm} >Clear Form</a>
										</div>
									</div>

								</form>

							</div>

						</div>
					</div>
				</div>

				{htmlForAlert}

			</div>
		);
	}
});

// <div className="radio radio-info radio-inline">
// 	<input type="radio" id="type_01" value="Copa America Song" name="type" onChange={this.handleTypeChange} />
// 	<label htmlFor="type_01">Copa America Song</label>
// </div>