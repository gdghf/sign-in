var express = require('express'),
    router = express.Router(),
    user = require('../models/user');

//get all user
router.get('/', function (req, res) {

});

//get user by id
router.get('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        res.json(user);
    });
});

//put user to db
router.put('/', function (req, res) {

    var data = new user({
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

    data.save(function (err, data) {

        console.log('saved!');
        res.send('添加成功');
    });
});

//modify user
router.post('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        //TODO validate params

        if (req.params.display_name) data.display_name = req.params.display_name.trim();
        if (req.params.sex) data.sex = req.params.sex;
        if (req.params.age) data.age = req.params.age;
        if (req.params.school) data.school = req.params.school.trim();

        if (req.params.company) {

            if (req.params.company.name) data.company.name = req.params.company.name.trim();
            if (req.params.company.title) data.company.title = req.params.company.title.trim();
            if (req.params.company.location) data.company.location = req.params.company.location.trim();
        }

        data.save(function (err, data) {
            if (err) throw err;

            res.json({ code: 1, msg: '修改成功' });
        });
    });
});

//delete user by id
router.delete('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        data.remove(function (err) {
            if (err) throw err;

            res.json({ code: 1, msg: '删除成功' });
        });
    });
});

module.exports = router;