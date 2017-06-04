import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('customer');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('showAll', true);
    controller.set('model', model);
  }
});
