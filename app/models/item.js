import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: {
    description: 'Item Name',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 3,
        max: 20
      })
    ]
  },
  ppu: {
    description: 'Price Per Unit',
    validators: [
      validator('presence', true),
      // FIXME: Doesn't play nice with edit form.

      /*
      validator('format', {
        regex: /^\d+(\.\d{2})?$/,
      })
      */
    ]
  },
  unit: {
    description: 'Unit of Measurement',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 3,
        max: 20
      })
    ]
  }
});

export default Model.extend(Validations, {
  name: DS.attr('string'),
  ppu: DS.attr('number'),
  unit: DS.attr('string')
});
