const mongoose = require('mongoose');
const schema = mongoose.Schema;

const hospitalSchema = new schema({
    name: String
})

const Hospitals = mongoose.model("Hospitals", hospitalSchema);

module.exports = Hospitals;