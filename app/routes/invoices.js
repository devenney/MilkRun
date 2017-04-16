import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteInvoice(invoice) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        invoice.destroyRecord();
      }
    }
  }
});
