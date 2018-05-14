const ajax = require('./helper/ajax.js');
let HOST = 'apidev.xin.com',
      PORT = '80',
      MOCK = '/',
      PROJECT_ID = '',
      WRAPPER = '';

function config(options) {
    HOST = options.host || HOST;
    PORT = options.port || PORT;
    PROJECT_ID = options.projectId || PROJECT_ID;
    MOCK = options.mock || MOCK;
    if ('wrapper' in options) {
        WRAPPER = options.wrapper;
    }
}

function queryDocLeverModel(callback) {
    const host = HOST, port = PORT, projectId = PROJECT_ID;
    ajax({
        host: host,
        port: port,
        path: '/xinmock/data?project=' + projectId
        // dataType: 'text'
    }, function(err, result) {
        if (err) {
            callback(err);
            return
        }
        callback(null, JSON.parse(result));
    });
}

exports.config = config;
exports.queryDocLeverModel = queryDocLeverModel;
