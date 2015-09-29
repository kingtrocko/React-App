# bein
bein sports

## Installation

    $ git clone https://github.com/agilityfeat/bein.git
    $ cd bein
    $ npm install
    $ npm install -g gulp

## Development

You will need two terminal tabs to develop, in the first terminal run:

	$ gulp watch

This is going to compile and copy all the files on the /public directory (html, css, js, less, images, fonts) and save them into the /dist folder, then is going to watch for changes on those files to compile automatically.

In the second terminal run:

	$ gulp serve-dev

This is going to fire the server on port 5000 and watch for changes on the server files to restart automatically.

