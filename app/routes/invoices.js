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

    saveInvoice(invoice) {
      invoice.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            invoice.save().then(
              invoice => {
                let customer = invoice.belongsTo('customer').value();
                customer.get('invoices').pushObject(invoice)
                customer.save().then(
                  () => this.transitionTo('invoices')
                )
              },
              error => {
                alert(error)
                // FIXME: Display errors properly.
              }
            )
          }
        })
    },
  }
});
