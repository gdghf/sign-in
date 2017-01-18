var mongoose = require('mongoose'),
    paginate = require('mongoose-paginate'),
    schema = mongoose.Schema;

//define activity schema
var activity = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
});

//pagenation plugin
activity.plugin(paginate);

module.exports = mongoose.model('activity', activity);