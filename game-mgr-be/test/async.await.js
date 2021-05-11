//async-await

const fn = async () => {
    return 1;
};

console.log(fn());

/*const fn = async function() {

};*/

/*const request = (arg, cb) => {
    setTimeout(() => {
        console.log(arg); ''
        cb(arg + 1);
    }, 300);
};
request(1, function (res1) {
    request(res1, function (res2) {
        request(res2, function (res3) {
            request(res3, function (res4) {
                request(res4, function (res5) {
                    console.log('res5:', res5);
                });
            });
        });
    });
});*/