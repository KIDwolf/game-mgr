const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const GAME_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Game = mongoose.model('Game');
const InventoryLog = mongoose.model('InventoryLog');

const findGameOne = async (id) => {
    const one = await Game.findOne({
        _id: id,
    }).exec();

    return one;
};



const router = new Router({
    prefix: '/game',
});

router.post('/add', async (ctx) => {
    const {
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    } = getBody(ctx);

    const game = new Game({
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    });

    const res = await game.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };
});

router.get('/list', async (ctx) => {

    const {
        page = 1,
        keyword = '',
    } = ctx.query;

    let = {
        size = 10,
    } = ctx.query;

    size = Number(size);

    const query = {};

    if (keyword) {
        query.name = keyword;
    }

    const list = await Game
        .find(query)
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await Game.countDocuments();

    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功',
    };
});

router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delMsg = await Game.deleteOne({
        _id: id,
    });
    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});

router.post('/update/count', async (ctx) => {
    const {
        id,
        type,
    } = ctx.request.body;

    let {
        num,
    } = ctx.request.body;

    num = Number(num);

    const game = await findGameOne(id);

    if (!game) {
        ctx.body = {
            code: 0,
            msg: '没有找到游戏',
        };
        return;
    }

    if (type === GAME_CONST.IN) {
        num = Math.abs(num);
    } else {
        num = -Math.abs(num);
    }
    game.count = game.count + num;

    if (game.count < 0) {
        ctx.body = {
            code: 0,
            msg: '剩下的量不足以出库',
        };
        return;
    }

    const res = await game.save();

    const log = new InventoryLog({
        num: Math.abs(num),
        type,
    });

    log.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '操作成功',
    };
});

router.post('/update', async (ctx) => {
    const {
        id,
        ...others
    } = ctx.request.body;

    const one = await findGameOne(id);

    //没有找到游戏的情况
    if (!one) {
        ctx.body = {
            msg: '没有找到游戏',
            code: 0,
        }
        return;
    }


    const newQuery = {};

    Object.entries(others).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        }
    });

    Object.assign(one, newQuery);

    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
});

router.get('/detail/:id', async (ctx) => {
    const {
        id
    } = ctx.params;

    const one = await findGameOne(id);

    //没有找到游戏的情况
    if (!one) {
        ctx.body = {
            msg: '没有找到游戏',
            code: 0,
        };
        return;
    }

    ctx.body = {
        msg: '查询成功',
        data: one,
        code: 1,
    }


});


module.exports = router;