import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function() {
    var store = this.get('store')

    var promises = [
      store.findAll('invoice-line'),
      store.findAll('invoice'),
      store.findAll('customer')
    ]

    return Ember.RSVP.all(promises);
  },
});
