const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    sentences: [{
        index: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        parts: [{
            index: {
                type: Number,
                required: true,
            },
            text: {
                type: String,
                // required: true,
            },
            type: {
                type: String, // text | word
                required: true,
            },
            wordType: {
                type: String, // NOUN | ADJ
            },
        }],
    }],
}, {
    collection: "article"
});

module.exports = ArticleSchema;