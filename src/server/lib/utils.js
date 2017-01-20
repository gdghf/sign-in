/**
 * Created by xiabin on 20/01/2017.
 */
var utils = {
    create_response: function (code, msg, data) {
        return {
            'code':code,
            'msg': msg,
            'data': data
        }
    }
};
module.exports = utils;