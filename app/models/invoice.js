import DS from 'ember-data';
import { Model } from 'ember-pouch';
import Ember from 'ember';

export default Model.extend({
  rev: DS.attr('string'),
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
