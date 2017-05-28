import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('item');
  },

  actions: {
    deleteItem(item) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        item.destroyRecord();
      }
    }
  }
});
