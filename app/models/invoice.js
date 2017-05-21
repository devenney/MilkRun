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
  }
})

export default Model.extend(Validations, {
  rev: DS.attr('string'),
  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  date: DS.attr('date'),
  amount: DS.attr('number'),
  paid: DS.attr('boolean'),
  customer: DS.belongsTo('customer', {inverse: 'invoices'}),

  // Outstanding Balance (exc. this)
  outstanding: function(){
    var id = this.get('id')
    var invoices = this.get("customer.invoices");

    var ret = 0;

    invoices.forEach(function(invoice){
      if (!invoice.get('paid') && invoice.get('id') != id) {
        ret += invoice.get("amount");
      }
    });

    return ret.toFixed(2);
  }.property("customer.invoices.@each.paid"),

  // Total Due (inc. Outstanding)
  total: function(){
    var id = this.get('id')
    var invoices = this.get("customer.invoices");

    var ret = 0;

    invoices.forEach(function(invoice){
      if (!invoice.get('paid')) {
        ret += invoice.get("amount");
      }
    });

    return ret.toFixed(2);
  }.property("customer.invoices.@each.paid"),

  hasOutstanding: Ember.computed.gt('outstanding', 0)
});
