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
    deleteCustomer(customer) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {

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

        Ember.RSVP.all(deletedInvoices).then(
          () => {
            customer.destroyRecord();
          }
        );
      }
    },

    saveCustomer(customer) {
      customer.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            customer.save().then(() => this.transitionTo('customers'));
          }
        })
    },
  }
});
