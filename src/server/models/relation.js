var mongoose = require('mongoose'),
    paginate = require('mongoose-paginate'),
    schema = mongoose.Schema;

//define relation schema
var relation = new schema({

});

//pagenation plugin
relation.plugin(paginate);

module.exports = mongoose.model('relation', relation);