
var React = require('react/addons');
var Router = require('react-router');
var TransitionGroup = React.addons.CSSTransitionGroup;
var Link = Router.Link;

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	mixins: [ Router.State ],

	render: function() {
		var name = this.getPath();

		return (
			<div className="application">

				<a href="#/contribute" className="btn-contrib-float">
					<i className="fa fa-cloud-upload"></i>
					<span> Contribute </span>
				</a>

	 			<div className="navbar-fixed-top">
				  	<div className="container">
				    	<div className="row">
					      	<div className="top-header clearfix">
					        
						        <ul className="actions-wrap">
						          <li>
						            <a href="http://www.beinsports.tv/getbein" className="text bein-link">Get beIN SPORTS</a>
						          </li>  
						          <li>
						            <div className="left-divider hide-560"></div>
						            <div className="share-icons-header">
						              <a href="http://www.beinsports.tv/about" target="_blank"  className="text">About</a>
						              <a href="mailto:info@beinsport.tv" className="icon"><i className="icon-envelope"></i></a>
						              <a href="http://www.beinsports.tv/faq" target="_blank" className="text">FAQ</a>
						              <a href="http://facebook.com/beINSportsUSA" target="_blank" className="icon"><i className="fa fa-facebook"></i></a>
						              <a href="http://twitter.com/beINSPORTSUSA" target="_blank" className="icon"><i className="fa fa-twitter"></i></a>
						              <a href="http://www.youtube.com/beINSPORTUSA" target="_blank" className="icon"><i className="fa fa-youtube"></i></a>
						              <a href="http://instagram.com/beinsportsusa" target="_blank" className="icon"><i className="icon-instagram"></i></a>
						            </div> 
						          </li>       
						        </ul>
							</div>

							<nav className="navbar">
						        <div className="navbar-header">
						          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						            <span className="sr-only">Toggle navigation</span>
						            <span className="icon-bar"></span>
						            <span className="icon-bar"></span>
						            <span className="icon-bar"></span>
						          </button>
						          <a className="navbar-brand" href="http://www.beinsports.tv"><i className="icon-be-in-logo"></i></a>
						        </div>
						        
						        <div id="navbar" className="collapse navbar-collapse">
						          <ul className="nav navbar-nav">
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/">Home</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/scores">Scores</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/fixtures">Fixtures</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/standings">Standings</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/stats">Stats</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/videos">Video</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/photo-galleries">Photos</a></li>
						            <li className=""><a href="http://www.en.copaamerica.beinsports.tv/music">Music</a></li>
                        <li className="sub">
                          <a href="http://www.en.copaamerica.beinsports.tv/tv">Tv</a>
                          <ul>
                            <li><a href="http://www.beinsports.tv/tv-schedule" target="_blank">TV Schedule</a></li>
                            <li><a href="#">Programming</a></li>
                            <li><a href="http://www.beinsportsconnect.tv" target="_blank">Get beIN SPORTS</a></li>
                          </ul>
                        </li>
						            <li className="with-icon"><a href="http://www.beinsportsconnect.tv" target="_blank"><i className="icon-be-in-connect"></i>CONNECT</a></li>
						          </ul>
						        </div>
						    </nav>


						    <div className="micro-menu clearfix">
						        <div className="link">
						        	<Link to="home">beIN the Beat</Link>
						        </div>
						        <div className="link">
						        	<Link to="song">Copa America Song</Link>
						        </div>
						        <div className="link">
						            <div className="dropdown select-team">
						                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
						                  Chants/Anthems
						                  <span className="caret"></span>
						                </button>
						                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "argentina"}}>Argentina</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "bolivia"}}>Bolivia</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "brazil"}}>Brazil</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "chile"}}>Chile</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "colombia"}}>Colombia</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "ecuador"}}>Ecuador</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "jamaica"}}>Jamaica</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "mexico"}}>Mexico</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "paraguay"}}>Paraguay</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "peru"}}>Perú</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "uruguay"}}>Uruguay</Link>
						                  </li>
						                  <li role="presentation">
						                  	<Link to="teams" params={{teamName: "venezuela"}}>Venezuela</Link>
						                  </li>
						                </ul>
						            </div>
						        </div>
						        <div className="link"> <Link to="audiocommon">AudioCommon</Link> </div>
						        <div className="link"> <Link to="contribute">Contribute</Link> </div>
						    </div>
						</div>
				    </div>
				</div>
				
				<TransitionGroup component="div" transitionName="example">
					<RouteHandler key={name} />
				</TransitionGroup>


				
				<div className="container">
				  	<div className="row">
					    <footer className="clearfix">
					      	<div className="col-sm-8">
						        <div className="row">
						          <div className="footer-block col-sm-4">
						            <h4>COPA AMERICA</h4>
						            <ul className="footer-menu">
						              <li><a href="http://www.en.copaamerica.beinsports.tv/" target="_blank">Home</a></li>
						              <li><a href="http://www.en.copaamerica.beinsports.tv/scores" target="_blank">Scores</a></li>
						              <li><a href="http://www.en.copaamerica.beinsports.tv/fixtures" target="_blank">Fixtures</a></li>
						              <li><a href="http://www.en.copaamerica.beinsports.tv/standings" target="_blank">Standings</a></li>
						              <li><a href="http://www.en.copaamerica.beinsports.tv/stats" target="_blank">Stats</a></li>
						              <li><a href="http://www.en.copaamerica.beinsports.tv/videos" target="_blank">Video</a></li>
						              <li><a href="http://www.en.copaamerica.beinsports.tv/photos" target="_blank">Photos</a></li>
						              <li><a href="http://es.copaamerica.beinsports.tv/">En Español</a></li>
						            </ul>
						          </div>
						          <div className="footer-block col-sm-4">
						            <h4><span>be</span>IN SPORTS HOME</h4>
						            <ul className="footer-menu">
						              <li><a href="http://www.beinsports.tv/home" target="_blank">Home</a></li>
						              <li><a href="http://www.beinsports.tv/soccer" target="_blank">Soccer</a></li>
						              <li><a href="http://www.beinsports.tv/motor-sports" target="_blank">Motorsports</a></li>
						              <li><a href="http://www.beinsports.tv/rugby" target="_blank">Rugby</a></li>
						              <li><a href="http://www.beinsports.tv/cycling" target="_blank">Cycling</a></li>
						              <li><a href="http://www.beinsports.tv/video-central" target="_blank">Video Central</a></li>
						              <li><a href="http://www.beinsports.tv/tv-schedule" target="_blank">TV Schedule</a></li>
						              <li><a href="http://www.beinsports.tv/getbein" target="_blank">Get beIN SPORTS</a></li>
						            </ul>
						          </div>
						          <div className="footer-block col-sm-4">
						            <h4><span>be</span>IN SPORTS CONNECT</h4>
						            <ul className="footer-menu">
						              <li><a href="http://www.beinsportsconnect.tv/" target="_blank">Home</a></li>
						              <li><a href="http://www.beinsportsconnect.tv/select-provider" target="_blank">Sign In</a></li>
						              <li><a href="http://www.beinsportsconnect.tv/schedule" target="_blank">Schedule</a></li>
						              <li><a href="http://www.beinsportsconnect.tv/faq" target="_blank">FAQ</a></li>
						              <li><a href="http://www.beinsportsconnect.tv/contact-us" target="_blank">Support</a></li>
						            </ul>
						          </div>
				        	    </div>
			      			</div>

						    <div className="footer-block light-block col-sm-4">
						        <h4>SOCIALIZE</h4>
						          <ul className="footer-social">
						            <li><a href="http://facebook.com/beINSportsUSA" target="_blank"><i className="fa fa-facebook"></i></a></li>
						            <li><a href="http://twitter.com/beINSportsUSA" target="_blank"><i className="fa fa-twitter"></i></a></li>
						            <li><a href="http://twitter.com/esbeinsports" target="_blank"><i className="fa fa-twitter"></i></a></li>
						            <li><a href="http://instagram.com/beinsportsusa" target="_blank"><i className="fa fa-instagram"></i></a></li>
						            <li><a href="http://www.youtube.com/beINSPORTUSA" target="_blank"><i className="fa fa-youtube"></i></a></li>
						            <li><a href="http://beinsportsusa.tumblr.com/" target="_blank"><i className="fa fa-tumblr"></i></a></li>
						          </ul>
						        <h4>OTHER</h4>
						        <ul className="footer-menu last">
						          <li><a href="http://www.beinsports.tv/contact-center" target="_blank">Contact Us</a></li>
						          <li><a href="http://affiliate.beinsports.tv/" target="_blank">Affiliate Website</a></li>
						          <li><a href="http://en.beinsports.net/" target="_blank">beIN SPORTS MENA</a></li>
						          <li><a href="http://www.beinsports.fr/" target="_blank">beIN SPORTS FRANCE</a></li>
						          <li><a href="http://www.beinsports.com.au/" target="_blank">beIN SPORTS AUSTRALIA</a></li>
						        </ul>
						    </div>
			      
						    <div className="col-xs-12 footer-copyright">
						        <span>Copyright © 2015 beIN SPORTS. All Rights Reserved.</span>
						        <div className="links">
						          <a href="http://www.beinsports.tv/privacy-policy" target="_blank">Privacy Policy</a>
						          <span>|</span>
						          <a href="http://www.beinsports.tv/terms-of-use" target="_blank">Terms of Use</a>
						        </div>
						    </div>
			            </footer>
		  			</div>
				</div>
				
			</div>
		);
	}
});

module.exports = App;