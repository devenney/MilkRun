import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function() {
    var store = this.get('store')

    var promises = [
      store.findAll('invoice-line'),
      store.findAll('invoice'),
      store.findAll('customer')
    ]

    return Ember.RSVP.all(promises);
  },

  actions: {
    deleteInvoice(invoice) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        let customer = invoice.belongsTo('customer').value();

        customer.get('invoices').removeObject(invoice).then(
          () => {
            customer.save().then(
              () => {
                invoice.destroyRecord();
              }
            )
          }
        )
      }
    },

    markInvoicePaid(invoice) {
      invoice.paid = true;
      invoice.save();
    },

    markInvoiceUnpaid(invoice) {
      let confirmation = confirm('Mark invoice unpaid?');

      if (confirmation) {
        invoice.paid = false;
        invoice.save();
      }
    },

    // Save a new or modified invoice record
    saveInvoice(invoice) {
      // The 'save' button should only enable when the model is valid,
      // but better safe than sorry
      invoice.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            // It is safe to save the child record first here as
            // there are no valid states in which the parent (customer)
            // is unsaved
            invoice.save().then(
              invoice => {
                // Get the customer record via the belongsTo reference
                let customer = invoice.belongsTo('customer').value();

                // If the customer's array already has a record with the
                // invoice's ID it will be updated rather than duplicated
                customer.get('invoices').pushObject(invoice)

                customer.save().then(
                  () => this.transitionTo('invoices.view', invoice.id)
                )
              },
              error => {
                alert(error)
                // FIXME: Display errors properly
              }
            )
          } else {
            // FIXME: Display errors properly
            alert("Please fix errors before saving.")
          }
        })
    },
  }
});
