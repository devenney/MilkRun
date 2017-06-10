import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('config');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    var store = this.store;

    if (model.content.length === 0) {
      var settings = store.createRecord('config')
      controller.set('config', settings)
    } else {
      controller.set('config', model.get('firstObject'))
    }
  },

  actions: {
    buttonClicked(config) {
      config.save().then(
        config => {
          console.log(config)
          this.transitionTo('config')
        },
        error => {
          //TODO: Handle errors properly.
          alert(error);
        }
      )
    }
  }
});
