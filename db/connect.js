const mongoose = require("mongoose");

const connectDB = (uri) => { uri,
    console.log("connect db");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;