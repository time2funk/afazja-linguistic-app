const mongoose = require("mongoose");
const Article = mongoose.model('Article');
const ArticelMaker = require('../helper/artice-maker');

const ArticleController = {

    getArticles: async () => 
        Article.find({}).exec().then(articles => ({
            data: articles
        })),

    getArticle: async id =>
        Article.findById(id).exec().then(article => ({
            data: article
        })),

    createArticle: async (text, name) => {
        const sentences = ArticelMaker.splitTextIntoSentences(text);

        return Article.create({ 
            name,
            sentences,
            text,
        })
        .then(article => ({data: article}));
    },

    updateArticle: async (id, {text, name}) => 
        Article.findById(id).exec().then(article => {
            article.name = name;
            article.text = text;
            article.sentences = ArticelMaker.splitTextIntoSentences(text);;
            article.save();
            return {data: article};
        }),

    deleteArticle: async id => {
        return Article.find({ _id: id })
            .remove()
            .exec()
            .then(status => ({status}));
    },

    test: function () {
        const result = [];
        const words = [
            'przyjaciela',
            'ciągu',
            'narodził',
            'już',
            '1832',
            'Według',
            'informował',
            'długi',
            'trudny'
        ];
        result.push(' - ----------------------------- -');
        for (let i = 0; i < words.length; i++) {
            const lexem = nlp.getLexem(words[i]);
            if (lexem)
                result.push(` [ lexem ] - ${words[i]}`, lexem.getPOS());
            else
                result.push(` [ lexem ] - ${words[i]}`, lexem);
        }
        result.push(' - ----------------------------- -');

        const lexem = nlp.getLexem(words[0]);
        result.push(` [ lexem ] - ${words[0]} (adj 2 noun)`, nlp.getAllFormsOf(lexem).map(a => a.toString()));
        return result;
    },

};
module.exports = ArticleController;