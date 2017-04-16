import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      invoice: this.store.findRecord('invoice', params.invoice_id),
      customers: this.store.findAll('customer')
    })
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('invoice', model.invoice);
    controller.set('title', 'Edit invoice');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('invoices/view');
  },

  actions: {
    printInvoice() {
      // TODO: Wait for result.
      window.print();
    }
  }
});

