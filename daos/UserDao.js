var mongodb = require('../models/db');
var User = require('../models/User');

exports.save = function save(user,callback) {
    // 存入 Mongodb 的文档
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 users 集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 为 name 属性添加索引
            collection.ensureIndex('name', {unique: true});
            // 写入 user 文档
            collection.insert(user, {safe: true}, function(err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};

exports.get = function get(username, callback) {

    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 users 集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查找 name 属性为 username 的文档
            collection.findOne({name: username}, function(err, doc) {
                mongodb.close();
                if (doc) {
                    // 封装对象为 User 对象
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};