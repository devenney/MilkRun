// App Config
import config from '../config/environment';
// Ember
import Ember from 'ember';
// Pouch
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

const { assert, isEmpty } = Ember;

/**
 * createDb() creats a local PouchDB
 *
 * @return {PouchDB} db
 */
function createDb() {
  const localDb = config.local_couch;

  assert('local_couch must be set', !isEmpty(localDb));

  let db = new PouchDB(localDb);

  return db;
}

export default Adapter.extend({
  init() {
    this._super(...arguments);
    this.set('db', createDb());
  }
});
