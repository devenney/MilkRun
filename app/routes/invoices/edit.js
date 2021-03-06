import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      invoice: this.store.findRecord('invoice', params.invoice_id),
      customers: this.store.findAll('customer'),
      items: this.store.findAll('item')
    })
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    let newLine = this.store.createRecord('invoice-line');

    controller.set('invoice', model.invoice);
    controller.set('line', newLine);


    controller.set('title', 'Edit invoice');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
   addLine() {
      let line = this.controller.get('line');
      let invoice = this.controller.get('invoice');

      line.set('invoice', invoice);

      line.save().then(
        line => {
          let invoiceRef = line.belongsTo('invoice');
          let invoice = invoiceRef.value()

          invoice.get('lines').pushObject(line)

          invoice.save().then(
            () => {
              this.controller.set('line', this.store.createRecord('invoice-line'))
            }
          )
        },
        error => {
          alert(error)
          // FIXME: Display errors properly.
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

