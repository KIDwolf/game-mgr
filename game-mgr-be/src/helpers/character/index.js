const defaultCharacters = [
    {
        title: '管理员',
        name: 'admin',
        power: {
            game: [0],
            user: [0],
        },
    },
    {
        title: '成员',
        name: 'member',
        power: {
            game: [1],
            user: [-1],
        },
    },
];

module.exports = {
    defaultCharacters,
};