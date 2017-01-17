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
    }
});

//pagenation plugin
activity.plugin(paginate);

module.exports = mongoose.model('activity', activity);