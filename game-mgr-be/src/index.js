const Koa = require('koa');
const koaBody = require('koa-body');
const { connect } = require('./db')
const registerRoutes = require('./routers');
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log');
const cors = require('@koa/cors');


const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody());

    app.use(catchTokenError);

    koaJwtMiddleware(app);

    app.use(logMiddleware);

    registerRoutes(app);

    app.listen(3000, () => {
        console.log('启动成功');
    });
});


//通过app.use注册中间件
//context上下文，当前请求的相关信息都在里面
/*app.use((context) => {
    const { request: req } = context;
    const { url } = req;

    if (url === '/user') {
        context.response.body = '<h1>哈哈哈</h1>';

        return;
    }

    context.body = '??';
});*/

//开启一个http服务，接受请求并处理，处理完后相应


