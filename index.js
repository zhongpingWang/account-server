'use strict';

import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import connectMongo from "connect-mongo"
import session from "express-session"
import bodyParser from "body-parser"
import connectRedis from 'connect-redis'
import uuidV4 from 'uuid/v4'

import router from "./routes/index.js"
import config from "./config/default.js"
//数据库连接
import mongodb from "./db-config/mongo.js"
import redisClient from "./db-config/redis"

const app = express() 

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//mongodb session
// const MongoStore = connectMongo(session);
// app.use(session({
//     name: config.session.name,
//     secret: config.session.secret,
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
//     cookie: config.session.cookie,
//     store: new MongoStore({
//         url: config.session.url,
//         touchAfter: 24 * 3600
//     })
// }))

//redis session
const redisStore = connectRedis(session);

app.use(session({

    name: config.session.name,
    genid: (req) => {
        return uuidV4();
    },
    secret: config.session.secret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: config.session.cookie, 
    store: new redisStore({
        client: redisClient
    })

}));



app.all('*', (req, res, next) => {
    const {
        origin,
        Origin,
        referer,
        Referer
    } = req.headers;
    const allowOrigin = origin || Origin || referer || Referer || '*';
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", 'Express');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

//页面
app.get('/', (req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n');
});


//页面
app.get('/account/page/**', (req, res) => res.render('index', {
    title: ""
}));

//其他路由
router(app,{redisClient});

//静态资源
app.use('/imgs', express.static(__dirname + '/static'));

//静态资源路径 导向
//app.use(express.static(__dirname + '/static'));

//404
app.use(function (req, res, next) {
    var err = new Error('Not FoundB');
    err.status = 404;
    next(err);
});

//错误信息页面
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(config.port, () => console.log('Example app listening on port !'+ config.port));