

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;

// Router for Provisional Landing Page
var LandingPage = require('../app/components/landing.jsx');
var LandingHandler = require('../app/components/landingHandler.jsx');

// Original Routes
var App 		= require('../app/components/app.jsx');
var HomePage 	= require("../app/components/homepage.jsx");
var SongPage 	= require("../app/components/songpage.jsx");
var MashupPage  = require("../app/components/mashuppage.jsx");
var TeamPage 	= require('../app/components/teams.jsx');
var Load = 		require('../app/components/load.jsx');
var Contribute = require('../app/components/contribute.jsx');

var Submissions = require('../app/components/_submissions/admin.jsx');

var Route = Router.Route;

var routes = (
	<Route handler={LandingHandler}>

		<Route path='/admin' name="admin" handler={Submissions} />

		<Route path="/" handler={App} >
			<Route name='song' handler={SongPage} />
			<Route name='audiocommon' handler={MashupPage} />
			<Route name='load' handler={Load} />
			<Route name='contribute' handler={Contribute} />
			<Route name='teams' path=':teamName' handler={TeamPage} />
			<DefaultRoute name="home" handler={HomePage} />
		</Route>

	</Route>
);

module.exports = routes;