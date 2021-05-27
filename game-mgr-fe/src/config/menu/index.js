export default [
    {
        title: '游戏管理',
        url: '/games',
        onlyAdmin: false,
    },
    {
        title: '用户管理',
        url: '/user',
        onlyAdmin: true,
    },
    {
        title: '操作日志',
        url: '/log',
        onlyAdmin: true,
    },
];