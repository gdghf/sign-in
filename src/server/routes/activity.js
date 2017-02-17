var express = require('express'),
    router = express.Router(),
    Activity = require('../models/activity'),
    utils = require('../lib/utils');


router.get('/', function (req, res, next) {
    var query = {};

    if (req.query.title) query.title = new RegExp(req.query.title.trim(), 'gi');

    var options = {
        select: '_id title description date_start date_end location creator date_created',
        page: req.query.page || 1,
        limit: req.query.page_size || 10,
        sort: {}
    };
    //define query with sort field
    if (req.query.sort) {
        var sort = req.query.sort.replace(/-|\s/g, '');
        options.sort[sort] = req.query.sort.startsWith('-') ? -1 : 1;
    }

    Activity.paginate(query, options).then(function (data) {
        res.json({
            result: data.docs,
            paging: {
                total_count: data.total,
                page_size: data.limit,
                page_index: data.page
            }

        });
    }).catch(function (error) {
        return next(error);
    });
});


//get activity by id
router.get('/:id', function (req, res, next) {
    Activity.findOne({_id: req.params.id}).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        return next(err)
    })
});

//modify user
router.put('/:id', function (req, res,next) {
    Activity.findOne({_id: req.params.id}).then(function (data) {
        if(data){
            if (req.body.title) data.title = req.body.title.trim();
            if (req.body.description) data.description = req.body.description.trim();
            if (req.body.description) data.location = req.body.location.trim();
            if (req.body.description) data.creator = req.body.creator.trim();
            if (req.body.description) data.date_start = new Date(req.body.date_start.trim());
            if (req.body.description) data.date_end = new Date(req.body.date_end.trim());
            if (req.body.description) data.date_created = new Date(req.body.date_created.trim());
            data.save(function (err, data) {
                if (err) return next(err);
                res.json(data);
            });
        }else{
            return next(new Error('data not fond'));
        }

    }).catch(function (error) {
        return next(error);
    });
});


//create activity
router.post('/', function (req, res, next) {
    var data = {date_created: new Date()};
    //validate title
    {
        var title = req.body.hasOwnProperty('title') ? req.body.title.trim() : '';
        if (!title) {
            throw  new Error('title 不能为空');
        }

        data.title = title;
    }

    //validate description
    {
        var description = req.body.hasOwnProperty('description') ? req.body.description.trim() : '';
        if (!description) {
            throw  new Error('description 不能为空');
        }

        data.description = description;
    }

    //validate date_start
    {
        var dateStart = req.body.hasOwnProperty('date_start') ? req.body.date_start.trim() : '';
        if (!dateStart) {
            throw  new Error('date_start 不能为空');
        }
        data.date_start = new Date(dateStart);
    }

    //validate date_end
    {
        var dateEnd = req.body.hasOwnProperty('date_end') ? req.body.date_end.trim() : '';
        if (!dateEnd) {
            throw  new Error('date_end 不能为空');
        }

        data.date_end = new Date(dateEnd);
    }

    //validate location
    {
        var location = req.body.hasOwnProperty('location') ? req.body.location.trim() : '';
        if (!location) {
            throw  new Error('location 不能为空');
        }

        data.location = location;
    }

    //validate creator
    {
        var creator = req.body.hasOwnProperty('creator') ? req.body.creator.trim() : '';
        if (!creator) {
            throw  new Error('creator 不能为空');
        }

        data.creator = creator;
    }


    //validate date_created
    {
        var dateCreated = req.body.hasOwnProperty('date_created') ? req.body.date_created.trim() : '';
        if (!dateCreated) {
            throw  new Error('date_created 不能为空');
        }

        data.date_created = new Date(dateCreated);
    }

    var activity = new Activity(data);

    activity.save(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

//delete activity by id
router.delete('/:id', function (req, res, next) {

    Activity.findOne({_id: req.params.id}).then(function (data) {
        if (data) {
            data.remove(function (err) {
                if (err) return next(err);
                res.json('delete activity successed');

            });
        } else {
            return next(new Error('data not fond'));
        }

    }).catch(function (error) {
        return next(error);
    });
});
module.exports = router;