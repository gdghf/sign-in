var express = require('express'),
    router = express.Router(),
    Activity = require('../models/activity'),
    utils = require('../lib/utils');



router.get('/', function (req, res) {
    var query = {};

    if (req.query.title) query.title = new RegExp(req.query.title.trim(), 'gi');

    var options = {
        select: '_id title description date_created ',
        page: req.query.page || 1,
        limit: req.query.page_size || 10,
        sort: {}
    };
    //define query with sort field
    if (req.query.sort) {
        var sort = req.query.sort.replace(/-|\s/g, '');
        options.sort[sort] = req.query.sort.startsWith('-') ? -1 : 1;
    }

    Activity.paginate(query, options, function (err, data) {
        if (err) throw err;
        res.json(utils.create_response(1,'ok',{ result: data.docs,
            paging: {
                total_count: data.total,
                page_size: data.limit,
                page_index: data.page
            }

        }));
    });
});


//get activity by id
router.get('/:id', function (req, res) {
    Activity.findOne({ _id: req.params.id }, function (err, result) {
        if (err) throw err;

        res.json(utils.create_response(1,'ok',result));
    });
});

//modify user
router.put('/:id', function (req, res) {

    Activity.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        if (req.body.title) data.title = req.body.title.trim();
        if (req.body.description) data.description = req.body.description;
        data.save(function (err, data) {
            if (err) throw err;
            res.json(utils.create_response(1,'modify activity successed'));
        });
    });
});


//create activity
router.post('/', function (req, res) {
    var data = {date_created: new Date()};
    //validate title
    {
        var title = req.body.hasOwnProperty('title') ? req.body.title.trim() : '';
        if (!title) {

            res.json({code: -1, msg: 'title 不能为空'});
            return;
        }

        data.title = title;
    }

    //validate description
    {
        var description = req.body.hasOwnProperty('description') ? req.body.description.trim() : '';
        if (!description) {

            res.json({code: -2, msg: 'description 不能为空'});
            return;
        }

        data.description = description;
    }
    var activity = new Activity(data);

    activity.save(function (err, data) {
        if (err) throw err;

        res.json(utils.create_response(1,'add activity successed'));
    });
});

//delete activity by id
router.delete('/:id', function (req, res) {

    Activity.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        data.remove(function (err) {
            if (err) throw err;
            res.json(utils.create_response(1,'delete activity successed'));

        });
    });
});

module.exports = router;