const mongoose = require("mongoose");
const Article = mongoose.model('Article');
const ArticelMaker = require('../helper/artice-maker');

const ArticleController = {

    getArticles: async () => new Promise((resolve, reject) => {
        Article.find({}, function (err, articles) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    data: articles.map(a => {
                        a.id = a._id;
                        delete a._id;
                        return a;
                    }),
                });
            }
        });
    }),

    getArticle: async id => new Promise((resolve, reject) => {
        Article.findById(id, function (err, article) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    data: article || null,
                });
            }
        });
    }),

    createArticle: async (text, name) => {
        const sentences = ArticelMaker.splitTextIntoSentences(text);
        console.log({sentences})
        return Article.create({ name, sentences }).then(article => ({id: article._id}));
    },

    // sync test
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