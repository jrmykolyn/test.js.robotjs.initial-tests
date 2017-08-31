// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const path = require( 'path' );

// Vendor
const robot = require( 'robotjs' );
const parseArgs = require( 'minimist' );

// Project
const lib = require( '../lib' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var ARGS = parseArgs( process.argv.slice( 2 ) );

var filePath = path.parse( process.argv[ 1 ] || '' );
var fileName = `${filePath.name}${filePath.ext}`;

var settings = {
	url: ARGS[ 'url' ] || null,
	scrollSpeed: ARGS[ 'scroll-speed' ] || 2,
	scrollDist: ARGS[ 'scroll-dist' ] || -10,
};

var url = ARGS.url || null;

var driver = lib.driver;

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function init( settings ) {
	if ( !settings.url || typeof settings.url !== 'string' ) {
		console.log( `Whoops! ${fileName} requires a 'url' argument. This argument can be provided by including the '--url={{ VALUE }}' flag when executing the script.` );
		console.log( `eg. node ${fileName} --url=http://google.ca` );
		return;
	}

	driver.get( settings.url )
		.then( () => {
			driver.manage().window().setSize( robot.getScreenSize().width, robot.getScreenSize().height );
			driver.manage().window().setPosition( 0, 0 );

			return;
		} )
		.then( () => {
			robot.moveMouse( 300, 300 );

			setInterval( function() {
				robot.scrollMouse( 0, settings.scrollDist );
			}, settings.scrollSpeed );

			return;
		} );
}

// --------------------------------------------------
// INIT
// --------------------------------------------------
init( settings );
