import { DBSchema, db } from '../services/redis';

class NekoUserSchema extends DBSchema {
  id = '';
  count = 0;
  created_at? = Date.now();
  password = '';

  validate() {
    console.log("validating", this.id)
    return typeof this.id === 'string';
  }

  sayHi() {
    console.log("hi!!!!!", this.id);
  }
}

export const NekoUser = db.createCollection('neko_user', NekoUserSchema);
