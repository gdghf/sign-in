var express = require('express'),
    router = express.Router(),
    user = require('../models/user');

//get all user
router.get('/', function (req, res) {

    var query = {};

    if (req.query.display_name) query.display_name = new RegExp(req.query.display_name.trim(), 'gi');
    if (req.query.sex) query.sex = req.query.sex.trim();
    if (req.query.age) query.age = req.query.age.trim();
    if (req.query.school) query.school = new RegExp(req.query.school.trim(), 'gi');

    var options = {
        select: '_id user_name display_name date_created sex age school company',
        page: req.query.page || 1,
        limit: req.query.page_size || 10,
        sort: {}
    };

    //define query with sort field
    if (req.query.sort) {

        var sort = req.query.sort.replace(/-|\s/g, '');
        options.sort[sort] = req.query.sort.startsWith('-') ? -1 : 1;
    }

    user.paginate(query, options, function (err, data) {
        if (err) throw err;

        res.json({
            code: 1,
            data: data.docs,
            paging: {
                total_count: data.total,
                page_size: data.limit,
                page_index: data.page
            },
            orderbys: 'user_name,display_name,date_created,sex,age,school'
        });
    });
});

//get user by id
router.get('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        res.json({ code: 1, data: user });
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
        if (err) throw err;

        res.json({ code: 1, msg: 'add user successed' });
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

            res.json({ code: 1, msg: 'modify user successed' });
        });
    });
});

//delete user by id
router.delete('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        data.remove(function (err) {
            if (err) throw err;

            res.json({ code: 1, msg: 'delete user successed' });
        });
    });
});

module.exports = router;