import Ember from 'ember';

export default Ember.Component.extend({
  buttonLabel: 'Save',

  actions: {
    addLine() {
      this.sendAction('addLine');
    },

    buttonClicked(param) {
      this.sendAction('action', param);
    }
  }
});
