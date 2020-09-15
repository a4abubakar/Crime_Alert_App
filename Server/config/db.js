const mongoose = require('mongoose');

const  mongoURI = "mongodb+srv://abubaker:admin123@cluster0-ja1cw.mongodb.net/blood_bank?retryWrites=true&w=majority";

mongoose.connect(mongoURI)

module.exports = mongoose;