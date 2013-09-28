/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-26
 * Time: 下午11:19
 * To change this template use File | Settings | File Templates.
 */
var settings  = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(
    settings.db,
    new Server(settings.host,
    Connection.DEFAULT_PORT,
    {}
    ));

