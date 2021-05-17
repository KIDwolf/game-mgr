const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const GameSchema = new mongoose.Schema({
    //游戏名
    name: String,
    //价格
    price: Number,
    //作者
    author: String,
    //发行日期
    publishDate: String,
    //分类
    classify: String,
    //库存
    count: Number,

    meta: getMate(),
});



mongoose.model('Game', GameSchema);