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
    this.render('invoices/form');
  },

  actions: {
    saveInvoice(existingInvoice) {
      existingInvoice.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            existingInvoice.save().then(
              invoice => {
                let customerRef = invoice.belongsTo('customer');
                let customer = customerRef.value();

                customer.get('invoices').pushObject(invoice)
                customer.save().then(this.transitionTo('invoices'))
              },
              error => {
                // FIXME: Display errors.
              }
            )
          }
        })
    },

    willTransition(transition) {
      let invoice = this.controller.get('invoice');

      if (invoice.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          invoice.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});

