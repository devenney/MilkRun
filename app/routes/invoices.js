import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteInvoice(invoice) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        invoice.destroyRecord();
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
    }
  }
});
