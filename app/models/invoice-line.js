import DS from 'ember-data';
import Ember from 'ember';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  count: {
    description: 'Item Count',
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        min: 1
      })
    ]
  },
  item: {
    description: 'Line Item',
    validators: [
      validator('presence', true),
      validator('belongs-to')
    ]
  },
  ppu: {
    description: 'Price Per Unit',
    validators: [
      validator('presence', true),
      // FIXME: Selecting an item updates the invoice-line form but
      // doesn't trigger this validation.

      /**
      validator('format', {
        regex: /^\d+(\.\d{2})?$/,
      })
      **/

    ]
  },
});

export default Model.extend(Validations, {
  invoice: DS.belongsTo('invoice', {inverse: 'lines'} ),
  count: DS.attr('number'),
  item: DS.belongsTo('item'),
  ppu: DS.attr('number'),
  cost: Ember.computed('count', 'ppu', function() {
    var count = this.get('count')
    var ppu = this.get('ppu')

    let ret = Number(count) * Number(ppu);

    return Number(ret).toFixed(2)
  })
});
