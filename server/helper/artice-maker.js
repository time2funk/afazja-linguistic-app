const specialCharsRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^`{|}~]+/;

const endCharsRegex = /[^\.!\?]+[\.!\?]+/;

const splitCharsRegex = /[|\\/:-]+/;

const whiteSpaceRegex = /\S+/;

const boundaryRegex = /\b/;

const wordRegex = /\w+/;

const sentenceSplit = new RegExp(
    endCharsRegex.source, 'g'
);
// const wordSplit = new RegExp(
//     `${boundaryRegex.source}|${whiteSpaceRegex.source}|${splitChars.source}`, 'g'
// );
// const checkWord = new RegExp(
//     wordRegex.source, "i"
// );
// const wordWrapChars = new RegExp(
//     `^${specialCharsRegex.source}|${specialCharsRegex.source}$`
// );

const wordWrap = (word, type, index) => ({
    type: 'word',
    index,
    text: word,
    wordType: type,
});

const textWrap = (word, index) => ({
    type: 'text',
    index,
    text: word,
});

const wordType = word => {
    const lexem = nlp.getLexem(word);
    return lexem ? lexem.getPOS(): null;
};


const ArticleMaker = {
    splitSentenceIntoParts: function (sentence) {
        const parts = [];

        let part = '';
        let last_pos = 0;
        let iter = 0;

        while (foo = wordRegex.exec(sentence)) {

            const word = foo[0];
            const start_pos = foo.index;
            part += sentence.substring(0, start_pos);

            if (wordType(word) === 'NOUN') {
                parts.push(
                    textWrap(part, iter++),
                    wordWrap(word, 'noun', iter++),
                );
                part = '';
            } else {
                part += word;
            }

            last_pos = start_pos + word.length;
            sentence = sentence.slice(last_pos);
        }
        part += sentence;
        parts.push(textWrap(part, iter));
        return parts;
    },

    splitTextIntoSentences: function (text) {
        if (!text) reject('no text');

        const result = [];
        const sentences = text.match(sentenceSplit);

        for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i];

            // TODO: cut white spaces at the beginning and at the end of sentence

            const parts = ArticleMaker.splitSentenceIntoParts(sentence, []);
            result.push({
                index: i,
                parts,
            });
        }
        return result;
    },
};
module.exports = ArticleMaker;