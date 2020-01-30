import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('starting-example', { path: '/starting-example/:id' });
  this.route('use-router', { path: '/use-router/:id' });
});
