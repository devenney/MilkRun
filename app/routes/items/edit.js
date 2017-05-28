import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('item', params.item_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit item');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('items/form');
  },

  actions: {
    saveItem(item) {
      item.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            item.save().then(
              () => this.transitionTo('items')
            );
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
