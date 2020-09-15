const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postBloodSchema = new schema({
    userid: String,
    name: String,
    email: String,
    bloodGrp: String,
    units: Number,
    urgency: String,
    country: String,
    state: String,
    city: String,
    volunteers: Number,
    hospital: String,
    relation: String,
    number: Number,
    info: String
})

const Blood_users = mongoose.model("Blood_users", postBloodSchema);

module.exports = Blood_users;