var mongoose = require('mongoose'),
    paginate = require('mongoose-paginate'),
    schema = mongoose.Schema;

//define user schema
var member = new schema({
    user_name: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    sex: String,
    age: Number,
    mobile: String,
    school: String,
    company: {
        name: String,
        title: String,
        location: String
    },
    specialty: String
});

//pagenation plugin
user.plugin(paginate);

module.exports = mongoose.model('user', user);