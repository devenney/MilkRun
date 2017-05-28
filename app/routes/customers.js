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
	customer.get('invoices').forEach(
          invoice => {
            invoice.destroyRecord();
          }
        )

        customer.destroyRecord();
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
