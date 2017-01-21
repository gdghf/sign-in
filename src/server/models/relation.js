var mongoose = require('mongoose'),
    paginate = require('mongoose-paginate'),
    schema = mongoose.Schema;

//define relation schema
var relation = new schema({
    activity_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
});

//pagenation plugin
relation.plugin(paginate);

module.exports = mongoose.model('relation', relation);