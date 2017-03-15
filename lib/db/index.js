var Datastore = require('nedb');
var util = require('../util');
var ds = new Datastore({filename: util.LOCAL_DB, autoload: true});

module.exports = {
  getInstance: function () {
    return ds;
  }
};
