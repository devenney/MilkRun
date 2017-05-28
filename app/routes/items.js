import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteItem(item) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        item.destroyRecord();
      }
    }
  }
});
