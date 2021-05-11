const Koa = require('koa');

const app = new Koa();
//通过app.use注册中间件
//context上下文，当前请求的相关信息都在里面
app.use((context) => {
    const { request: req } = context;
    const { url } = req;

    if (url === '/user') {
        context.response.body = '<h1>哈哈哈</h1>';

        return;
    }

    context.body = '??';
});

//开启一个http服务，接受请求并处理，处理完后相应
app.listen(3000, () => {
    console.log('启动成功');
});
console.log('1122');
