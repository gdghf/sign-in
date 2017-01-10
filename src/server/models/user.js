var mongoose = require('mongoose'),
    schema = mongoose.Schema;

//define user schema
var user_schema = new Schema({
    id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    usern_name: {
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
    school: String,
    company: {
        name: String,
        title: String,
        location: String
    }
});

module.exports = mongoose.model('user', user_schema);