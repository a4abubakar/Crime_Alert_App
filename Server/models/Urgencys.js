const mongoose = require('mongoose');
const schema = mongoose.Schema;

const urgencySchema = new schema({
    urgency: String
})

const Urgencys = mongoose.model("Urgencys", urgencySchema);

module.exports = Urgencys;