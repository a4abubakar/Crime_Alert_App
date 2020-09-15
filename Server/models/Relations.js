const mongoose = require('mongoose');
const schema = mongoose.Schema;

const relationSchema = new schema({
    relation: String
})

const Relations = mongoose.model("Relations", relationSchema);

module.exports = Relations;