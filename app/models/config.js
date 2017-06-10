import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  addressLineOne: {
    description: 'Address Line 1',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 5,
        max: 50
      })
    ]
  },
  addressLineTwo: {
    description: 'Address Line 2',
    validators: [
      validator('length', {
        allowBlank: true,
        min: 5,
        max: 50
      })
    ]
  },
  city: {
    description: 'Address Line 1',
    validators: [
      validator('length', {
        min: 3,
        max: 20
      })
    ]
  },
  // TODO: International Regex?
  postcode: {
    description: 'Address Line 1',
    validators: [
      validator('length', {
        min: 7,
        max: 10
      })
    ]
  }

})

export default Model.extend(Validations, {
  addressLineOne: DS.attr('string'),
  addressLineTwo: DS.attr('string'),
  city: DS.attr('string'),
  postcode: DS.attr('string')
});
