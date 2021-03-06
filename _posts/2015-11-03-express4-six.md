---
title: express4.x connect-flash 模块学习
category: express4.x
description: express4.x connect-flash 模块学习总结
keywords: express,express4.x,connect-flash
---

以下的内容摘录于 <https://github.com/jaredhanson/connect-flash> 并结合了自己的理解。

The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.` The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.`

`Flash messages are stored in the session.` First, setup session as usual by enabling session middleware. Then, use flash middleware provided by connect-flash.

With the flash middleware in place, all requests will have a `req.flash()` function that can be used to flash messages.

Example: 

    //app.js
    var flash = require('connect-flash');
    var session = require('session');
    var app = express();
    
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    });
    app.use(flash());
    
    // routes/index.js
    var router = express.Router();
    
    router.route('/')
    .get(function(req, res, next) {
        //set a flash message by passing the key, followed by the value, to req.flash().
        req.flash('flash', 'test flash!');
        res.redirect(303, '/flash');
    });
    
    router.route('/flash')
    .get(function(req, res, next) {
        //get an array of flash messages by passing the key to req.flash()
        console.log(req.flash('flash'));  // [ 'test flash!' ]
        res.send('ok');
    });
    
All code at <https://github.com/SPxiaomin/NodeJs_Practice/tree/master/module_2> .

欢迎指教=^_^=
