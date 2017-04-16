import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      invoices: this.store.findAll('invoice'),
      customers: this.store.findAll('customer'),
    })
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('invoice', this.store.createRecord('invoice'));
    controller.set('title', 'Create a new invoice');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    saveInvoice(newInvoice) {
      console.log(newInvoice);

      newInvoice.save().then(
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

