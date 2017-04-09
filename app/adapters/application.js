import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

var db = new PouchDB('local_pouch');

PouchDB.debug.enable('*');

export default Adapter.extend({
  db: db
});
