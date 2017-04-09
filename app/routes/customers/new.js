import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('customer');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create a new customer');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate() {
    this.render('customers/form');
  },

  actions: {

    saveCustomer(newCustomer) {
      newCustomer.save().then(() => this.transitionTo('customers'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
