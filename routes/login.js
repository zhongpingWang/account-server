import express from "express"

const router = express.Router();

import UserInfo from "../viewModel/userInfo.js"

router.get("/add", function (req, res) {

    UserInfo.save({
        account: "admin",
        userName: "admin",
        passWord: "admin",
        email: "admin",
        phone: "admin",
        mobile: "admin",
        age: 19,
        sex: 0,
        desction: "admin",
        depId: "admin",
        avatar: "admin",
        authId: "admin",
        address: "admin",
        posi: "admin"
    }).then((reqData) => {

        if (reqData != null) {

            UserInfo.resJSON(res, reqData)
        } else {

            UserInfo.resError(res, '系统错误')
        }
    })

});

router.get("/test", function (req, res) {

    UserInfo.find().then(function (doc) {

        if (doc == null) {
            UserInfo.resError(res, '用户名或密码错误')
        } else {

            req.session.userInfo = doc

            UserInfo.resJSON(res, doc)
        }

    });
});

// 登录
router.post('/login', function (req, res) {

    var params = req.body

    UserInfo.findOne({
        account: params.account,
        passWord: params.passWord
    }).then(function (doc) {

        if (doc == null) {

            UserInfo.resError(res, '用户名或密码错误')
        } else {

            req.session.userInfo = doc
            UserInfo.resJSON(res, doc)
        }

    });

});

// 退出
router.get('/loginout', function (req, res) {

    // 删除session
    req.session.userInfo = null;
    UserInfo.resJSON(res, {
        data: '退出成功'
    })
})

exports = module.exports = router