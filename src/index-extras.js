import Scrollmeister from 'scrollmeister.js';
import './scrollmeister.sass';
import './conditions';
import './behaviors/extras.js';
import './components';

//This makes browserify --standalone work and exports Scrollmeister as an UMD module.
module.exports = Scrollmeister; //eslint-disable-line no-undef
