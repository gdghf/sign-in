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

    var data = { date_created: new Date(), company: {} };

    //validate username
    {
        var user_name = req.params.user_name.trim();
        if (!user_name) {

            res.json({ code: -1, msg: '用户名不能为空' });
            return;
        }

        data.user_name = user_name;
    }

    //validate display_name
    {
        var display_name = req.params.display_name.trim();
        if (!display_name) {

            res.json({ code: -2, msg: '用户显示名称不能为空' });
            return;
        }

        data.display_name = display_name;
    }

    //validate age
    {
        var age = parseInt(req.params.age);
        if (NaN(age) || age <= 0 || age >= 100) {

            res.json({ code: -3, msg: '用户年龄不正确' });
            return;
        }

        data.age = age;
    }

    //validate sex
    {
        var sex = req.params.sex.trim();
        if (!sex || (sex != '男' || sex != '女')) {

            res.json({ code: -4, msg: '用户性别不正确' });
            return;
        }

        data.sex = sex;
    }

    if (!req.params.school) data.school = req.params.school.trim();
    if (!req.params.name) data.company.name = req.params.name.trim();
    if (!req.params.title) data.company.title = req.params.title.trim();
    if (!req.params.location) data.company.location = req.params.location.trim();

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