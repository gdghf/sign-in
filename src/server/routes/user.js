var express = require('express'),
    router = express.Router(),
    user = require('../models/user');

//get all user
router.get('/', function (req, res) {

});

//get user by id
router.get('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, user) {
        if (err) throw err;

        res.json(user);
    });
});

//put user to db
router.put('/', function (req, res) {

    var user_info = new user({
        user_name: 'leixu2txtek',
        display_name: 'Lei Xu',
        password: '111111',
        date_created: new Date(),
        sex: '男',
        age: 25,
        school: '中国科技大学',
        company: {
            name: '安徽讯飞皆成软件技术有限公司',
            title: '软件开发工程师',
            location: '安徽合肥'
        }
    });

    user_info.save(function (err, doc) {

        console.log('saved!');
        res.send('添加成功');
    });
});

//modify user
router.post('/', function (req, res) {

});

//delete user by id
router.delete('/:id', function (req, res) {

});

module.exports = router;