import express from "express"

const router = express.Router();

import UserInfo from "../viewModel/userInfo.js"

import jwt from 'jsonwebtoken'

import util from "../util/util"

var redisClient;


// redisClient.del(item.sid)
//await redisClient.delAsync(token)


// 登录
router.post('/login', function (req, res) {

    var params = req.body

    UserInfo.findOne({
        account: params.account,
        passWord: params.passWord
    }).then(function (doc) {

        if (doc == null) {

            UserInfo.resError(res, '用户名或密码错误');

        } else {

            req.session.userInfo = doc;

            var secret = "token-secret";
            var expires =  60 * 60 * 24;

            const token = jwt.sign(doc,secret,{ expiresIn: expires });

            await redisClient.setAsync(token, JSON.stringify([]));

            res.setHeader(
                'Set-Cookie',
                `.ak47=${token};domain=ibiographys.com;max-age=${expires};httpOnly`);


            UserInfo.resJSON(res, doc)
        }

    });

});

// 退出
router.get('/loginout', function (req, res) { 

    let cookies = util.splitCookies(req.headers.cookie)
    let token = cookies['.ak47'];

    if (token) { 
        redisClient.del(token)
        await redisClient.delAsync(token);
    }

    // 删除session
    req.session.userInfo = null;

    UserInfo.resJSON(res, {
        data: '退出成功'
    });
    
})



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

export default function(redisClient){
    redisClient = redisClient;
    return router;
}