import DS from 'ember-data';
import Ember from 'ember';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  amount: {
    description: 'Invoice Amount',
    validators: [
      validator('presence', true),
      validator('format', {
        regex: /^\d+(\.\d{2})?$/,
      })
    ]
  },
  createdAt: {
    description: 'Creation Date',
    validators: [
      validator('presence', true),
    ]
  },
  customer: {
    description: 'Invoice Customer',
    validators: [
      validator('presence', true),
      validator('belongs-to')
    ],
  },
  date: {
    description: 'Invoice Date',
    validators: [
      validator('presence', true),
      validator('date', {
        format: 'DD-MM-YYYY'
      })
    ]
  },
  hasOutstanding: {
    description: 'Boolean tracking outstanding balance presence',
    validators: [
      validator('presence', true)
    ]
  },
  lines: {
    description: 'Invoice Lines',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 1
      })
    ]
  },
  outstanding: {
    description: 'Previous Outstanding',
    validators: [
      //TODO: Validate optional field?
    ]
  },
  paid: {
    description: 'Invoice Payment State',
    validators: [
      validator('presence', true)
    ]
  },
  total: {
    description: 'Invoice Total (Amount + Outstanding)',
    validators: [
      //TODO: Validate optional field?
    ]
  }
})

export default Model.extend(Validations, {
  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  date: DS.attr('date'),

  paid: DS.attr('boolean', {
    defaultValue() {
      return false;
    }
  }),

  // Relationships
  customer: DS.belongsTo('customer', {inverse: 'invoices'}),
  lines: DS.hasMany('invoice-line', {inverse: 'invoice'}),

  // Computed Values
  amount: function() {
    var subtotal = Number(0)

    let lines = this.get('lines')

    if (lines) {
      lines.forEach(function(line) {
        subtotal += Number(line.get("cost"));
      })
    }

    return Number(subtotal).toFixed(2)
  }.property("lines.@each.cost"),

  // Outstanding Balance (exc. this)
  outstanding: function(){
    var id = this.get('id')
    var invoices = this.get("customer.invoices");

    var ret = Number(0);

    if(invoices) {
      invoices.forEach(function(invoice){
        if (!invoice.get('paid') && invoice.get('id') != id) {
          ret += Number(invoice.get("amount"));
        }
      });
    }

    return ret.toFixed(2);
  }.property("customer.invoices.@each.paid"),

  // Total Due (inc. Outstanding)
  total: function(){
    var id = this.get('id')
    var invoices = this.get("customer.invoices");

    var ret = Number(0);

    if (invoices) {
      invoices.forEach(function(invoice){
        if (!invoice.get('paid')) {
          ret += Number(invoice.get("amount"));
        }
      });
    }

    return Number(ret).toFixed(2);
  }.property("customer.invoices.@each.paid"),

  hasOutstanding: Ember.computed.gt('outstanding', 0)
});
