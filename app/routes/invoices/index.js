import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      invoices: this.store.findAll('invoice'),
    })
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('showAll', true);
    controller.set('model', model);
  },
});

