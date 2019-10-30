const NlpService = {

    types: ['NOUN','ADJECTIVE'],

    getType: function (word) {
        const lexem = nlp.getLexem(word);
        return lexem ? lexem.getPOS(): null;
    },

};
module.exports = NlpService;