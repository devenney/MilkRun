import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  forename: {
    description: 'Forename',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 35
      })
    ]
  },
  surname: {
    description: 'Surname',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 35
      })
    ]
  },
  address: {
    description: 'Address',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 10,
        max: 35
      })
    ]
  },

});

export default Model.extend(Validations, {
  forename: DS.attr('string'),
  surname: DS.attr('string'),
  address: DS.attr('string'),

  invoices: DS.hasMany('invoice', {inverse: 'customer'}),

  fullname: function() {
    let forename = this.get('forename')
    let surname = this.get('surname')

    let fullname = '';

    if (forename != null) {
      fullname += forename + ' '
    }

    if (surname != null) {
      fullname += surname
    }

    return fullname
  }.property('forename', 'surname')
});
