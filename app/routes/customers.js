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
    // Delete customer and all associated invoices
    deleteCustomer(customer) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {

        // Array of deletions to execute
        let deletedInvoices = [];

        customer.get('invoices').then(
          invoices => {
            invoices.map(
              invoice => {
                deletedInvoices.push(invoice.destroyRecord());
              }
            );
          }
        );

        // Delete all invoices then delete customer
        Ember.RSVP.all(deletedInvoices).then(
          () => {
            customer.destroyRecord();
          }
        );
      }
    },

    // Save a new or modified customer record
    saveCustomer(customer) {
      // The 'save' button should only enable when the model is valid,
      // but better safe than sorry
      customer.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            customer.save().then(() => this.transitionTo('customers'));
          } else {
            // FIXME: Display errors properly
            alert("Please fix errors before saving.")
          }
        })
    },
  }
});
