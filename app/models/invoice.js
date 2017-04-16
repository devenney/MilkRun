import DS from 'ember-data';
import { Model } from 'ember-pouch';

export default Model.extend({
  rev: DS.attr('string'),
  date: DS.attr('date'),
  amount: DS.attr('number'),
  customer: DS.belongsTo('customer', {inverse: 'invoices'})
});
