const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bloodGrpSchema = new schema({
    blood_grp: String
})

const Blood_grps = mongoose.model("Blood_grps", bloodGrpSchema);

module.exports = Blood_grps;