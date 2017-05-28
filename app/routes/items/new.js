import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('item')
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create a new item');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate() {
    this.render('items/form');
  },

  actions: {
    saveItem(item) {
      item.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            item.save().then(() => this.transitionTo('items'));
          }
        })
    },

    willTransition(transition) {
      let model = this.controller.get('model')

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't been saved. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
