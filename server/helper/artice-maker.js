const specialCharsRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^`{|}~]+/;

const endCharsRegex = /[^\.!\?]+[\.!\?]+/;

const splitCharsRegex = /[|\\/:-]+/;

const whiteSpaceRegex = /\S+/;

const boundaryRegex = /\b/;

const wordRegex = /[ĄąĆćĘęŁłŃńÓóŚśŹźŻż\w]+/; // polish

const sentenceSplit = new RegExp(
    endCharsRegex.source, 'g'
);

const wordWrap = (word, type, lexem, index) => ({
    type: 'word',
    index,
    text: word,
    wordType: type,
    base: lexem.getBase(),
});

const textWrap = (word, index) => ({
    type: 'text',
    index,
    text: word,
});

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

            const lexem = nlp.getLexem(word) || null;
            if (lexem && lexem.getPOS() === 'NOUN') {
                if (part) {
                    parts.push(textWrap(part, iter++));
                    part = '';
                }
                parts.push(wordWrap(word, 'noun', lexem, iter++));
            } else {
                part += word;
            }
            last_pos = start_pos + word.length;
            sentence = sentence.slice(last_pos);
        }
        part += sentence;
        if (part) {
            parts.push(textWrap(part, iter));
        }
        return parts;
    },

    splitTextIntoSentences: function (text) {
        if (!text) reject('no text');

        const result = [];
        let sentences = text.match(sentenceSplit);
        if (text && !sentences) {
            sentences = [text];
        }

        for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i];
            const parts = ArticleMaker.splitSentenceIntoParts(sentence, []);
            result.push({
                index: i,
                text: sentence,
                parts,
            });
        }
        return result;
    },
};
module.exports = ArticleMaker;