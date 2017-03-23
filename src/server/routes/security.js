var express = require('express'),
    router = express.Router();

var jwt = require('jsonwebtoken'),
    User = require('../models/user');

router.post('/login', function (req, res) {

    //校验用户名
    {
        var user_name = req.body.user_name && req.body.user_name.trim();
        if (!user_name) return res.json({ code: -1, msg: '用户名不能为空' });
    }

    //校验密码
    {
        var password = req.body.password && req.body.password.trim();
        if (!password) return res.json({ code: -2, msg: '密码不能为空' });
    }

    User.findOne({ user_name: user_name, password: password }, function (err, data) {
        if (err) throw err;

        if (!data) return res.json({ code: -3, msg: '用户名或密码不正确' });

        //生成用户信息cookie
        {
            var token = jwt.sign({
                id: data._id,
                role: data.role,
                user_name: data.user_name,
                display_name: data.display_name,
                avatar_url: data.avatar_url
            }, new Buffer('donotmidifythisstring', 'base64'));

            res.cookie('auth', token);
        }

        return res.json({ code: 1, msg: '登录成功', role: data.role });
    });
});

router.post('/logout', function (req, res) {

    res.cookie('auth', '', { expires: new Date(Date.now() - 1000), httpOnly: true });
    return res.json({ code: 1, msg: '退出成功' });
});

module.exports = router;