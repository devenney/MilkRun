import DS from 'ember-data';
import { Model } from 'ember-pouch';
import Ember from 'ember';

export default Model.extend({
  forename: DS.attr('string'),
  surname: DS.attr('string'),
  address: DS.attr('string'),

  invoices: DS.hasMany('invoice', {inverse: 'customer'}),

  isValid: Ember.computed.notEmpty('forename')
});
