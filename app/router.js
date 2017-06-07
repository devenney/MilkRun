import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('customers', function() {
    this.route('new');
    this.route('edit', { path: '/:customer_id/edit' });
  });
  this.route('invoices', function() {
    this.route('new');
    this.route('edit', { path: '/:invoice_id/edit' });
    this.route('view', { path: '/:invoice_id/view' });
  });
  this.route('items', function() {
    this.route('new');
    this.route('edit', { path: '/:item_id/edit' });
  });
  this.route('config');
});

export default Router;
