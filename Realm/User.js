'use strict';

import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 1},
        done: {type: 'bool', default: false},
    },
};

class Bulking extends Realm.Object {}
Bulking.schema = {
    name: 'Bulking',
    primaryKey: 'id',
    properties: {
        id: {type: 'int'},
        gifString: {type: 'string'},
        weight: {type: 'string'},
        repeat: {type: 'string'},
        userSend: {type: 'string', optional: true},
    },
};


class FBUser extends Realm.Object {}
FBUser.schema = {
  name: 'FBUser',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 1},
    iduser: {type: 'string'},
    name: {type: 'string', optional:true},
    gender: {type: 'string', optional:true},
    picture: {type: 'string', optional:true},
    email: {type: 'string', optional:true},
    birthday: {type: 'string', optional:true}

  }
};

class UserPrueba extends Realm.Object {}
UserPrueba.schema = {
  name: 'UserPrueba',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 1},
    iduser: {type: 'string'},
    name: {type: 'string', optional:true}

  }
};
export default new Realm({schema: [User, Bulking, FBUser, UserPrueba]});
