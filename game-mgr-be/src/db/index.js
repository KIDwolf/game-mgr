const mongoose = require('mongoose');
//给哪个数据库的哪个集合添加什么格式的文档
//Schema,Modal根据Schema生成的一套方法集合，用来操作集合和集合下文档
const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
});

const UserModal = mongoose.model('User', UserSchema);

const connect = () => {
    //去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
    //当数据库被打开的时候 做一些事情
    mongoose.connection.on('open', () => {
        console.log('连接成功');
        //创建文档
        const user = UserModal({
            nickname: '小红',
            password: '123456',
            age: 12,
        });

        user.age = 99;

        //保存，同步到MongDB
        user.save();
    });
};

connect();
