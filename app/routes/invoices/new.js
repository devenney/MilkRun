import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      invoices: this.store.findAll('invoice'),
      customers: this.store.findAll('customer'),
      items: this.store.findAll('item')
    })
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    let invoice = this.store.createRecord('invoice')
    let line = this.store.createRecord('invoice-line');

    controller.set('invoice', invoice);
    controller.set('line', line);

    controller.set('title', 'Create a new invoice');
    controller.set('buttonLabel', 'Create');
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

          this.controller.set('line', this.store.createRecord('invoice-line'))
        },
        error => {
          alert(error)
          // FIXME: Display errors properly.
        }
      )
    },

    saveInvoice(newInvoice) {
      newInvoice.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            newInvoice.save().then(
              invoice => {
                let customerRef = invoice.belongsTo('customer');
                let customer = customerRef.value();
                customer.get('invoices').pushObject(invoice)

                customer.save().then(this.transitionTo('invoices'))
              },
              error => {
                alert(error)
                // FIXME: Display errors properly.
              }
            )
          }
        })
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

