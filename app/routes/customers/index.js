import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('customer');
  },

  actions: {

    deleteCustomer(customer) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        customer.destroyRecord();
      }
    }
  }
});
