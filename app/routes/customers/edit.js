import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('customer', params.customer_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit customer');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('customers/form');
  },

  actions: {

    saveCustomer(newCustomer) {
      newCustomer.save().then(() => this.transitionTo('customers'));
    },

    willTransition(transition) {

      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
