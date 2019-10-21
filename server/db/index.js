const mongoose = require("mongoose");

const UserSchema = require('./schemas/User');

module.exports.connect = async function (config) {
    return mongoose.connect(config.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        
        console.log('[ mongo ]', 'Database connected');
        initModels();
        
    });
};

function initModels() {
    mongoose.model("user", UserSchema);
}
