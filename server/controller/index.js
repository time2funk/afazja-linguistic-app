const _ = require('lodash');
const mongoose = require("mongoose");
const Article = mongoose.model('Article');
const ArticelMaker = require('../helper/artice-maker');
const { findImages } = require('../helper/index');

const ArticleController = {

    getArticles: async () => 
        Article.find({}).exec().then(articles => ({
            data: articles
        })),

    getArticle: async (id, options) =>
        Article.findById(id).exec()
            .then(async data => {
                const article = data.toObject();
                if (article && article.sentences.length) {
                    for (const sentence of article.sentences) {
                        for (const part of sentence.parts) {
                            if (part.type === 'word') {
                                if (options.imagesFeature) {
                                    try {
                                        part.images = await findImages(part.text, options.imagesLength);
                                    } catch (error) {
                                        part.images = [{
                                            url: 'https://media.gettyimages.com/photos/cropped-image-of-person-eye-picture-id942369796?s=612x612',
                                        }];
                                    }
                                }
                            };
                        }
                    }
                }
                return { data: article };
            }),

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
            'chłopaków',
            'ciągu',
            'narodził',
            'już',
            '1832',
            'Według',
            'informował',
            'długi',
            'trudny',
            'kota',
            'kotu',
            'kotem',
            'słowem',
        ];
        for (let i = 0; i < words.length; i++) {
            const lexem2 = nlp.getLexem(words[i]);
            if (lexem2)
                result.push(`${words[i]} - ${lexem2.getPOS()} = ${lexem2.toString()}`);
        }
        
        return result;
    },

};
module.exports = ArticleController;