const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    collection: "edge"
});
module.exports = UserSchema;