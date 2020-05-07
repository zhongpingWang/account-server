export default { 
    port: 9091,
    url: 'mongodb://localhost:27017/account_user',

    session: {
        url:"mongodb://localhost:27017/session",
        name: '.sid',
        secret: '.secret',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    }
}