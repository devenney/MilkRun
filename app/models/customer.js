import DS from 'ember-data';
import { Model } from 'ember-pouch';

export default Model.extend({
  forename: DS.attr('string'),
  surname: DS.attr('string'),
  address: DS.attr('string'),

  isValid: Ember.computed.notEmpty('forename')
});
