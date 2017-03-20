var express = require('express'),
    router = express.Router(),
    user = require('../models/user');

/**
 * @api {get} /member/ 获取所有成员信息
 * @apiGroup member
 * 
 * @apiParam {string} display_name 用户名称
 * @apiParam {string} sex 性别
 * @apiParam {string} age 年龄段
 * @apiParam {string} school 学校名称
 * 
 * @apiSuccessExample {json} 返回值
 * {
 *      code: 1,
 *      data:
 *      [
 *          {
 *              _id: '成员ID',
 *              user_name: '用户名',
 *              display_name: '显示名',
 *              date_created: '创建时间',
 *              sex: '性别',
 *              age: '年龄',
 *              school: '毕业学校',
 *              company: 
 *              {
 *                  name: '公司名称',
 *                  title: '职务',
 *                  location: '地点'
 *              }
 *          }
 *      ],
 *      paging:
 *      {
 *          total_count: 0,     //总数
 *          page_size:  10,     //分页大小
 *          page_index: 1       //当前页码
 *      },
 *      orderbys: 'user_name,display_name,date_created,sex,age,school'
 * }
 */
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

/**
 * @api {get} /member/{id} 获取指定ID的成员信息
 * @apiGroup member
 * 
 * @apiParam {string} id 成员ID
 * 
 * @apiSuccessExample {json} 返回值
 * {
 *      code: 1,
 *      user:
 *      {
 *          id: '成员ID',
 *          user_name: '用户名',
 *          display_name: '显示名',
 *          date_created: '创建时间',
 *          sex: '性别',
 *          age: '年龄',
 *          school: '毕业学校',
 *          company: 
 *          {
 *              name: '公司名称',
 *              title: '职务',
 *              location: '地点'
 *          }
 *      }
 * }
 */
router.get('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        res.json({
            code: 1,
            user: {
                id: data._id,
                user_name: data.user_name,
                display_name: data.display_name,
                date_created: data.date_created,
                sex: data.sex,
                age: data.age,
                school: data.school,
                company: data.company
            }
        });
    });
});


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

/**
 * @api {delete} /member/{id} 删除指定ID的成员
 * @apiGroup member
 * 
 * @apiParam {string} id 成员ID
 * 
 * @apiSuccessExample {json} 正确信息
 * {
 *      code: 1,
 *      msg: 'user has been deleted'
 * }
 * 
 * @apiErrorExample {json} 错误信息
 * {
 *      code: -1,
 *      msg: '指定ID的成员不存在'
 * }
 */
router.delete('/:id', function (req, res) {

    user.findOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;

        if (!data) {

            res.json({ code: -1, msg: 'can not find member' });
            return;
        }

        data.remove(function (err) {
            if (err) throw err;

            res.json({ code: 1, msg: 'user has been deleted' });
        });
    });
});

module.exports = router;