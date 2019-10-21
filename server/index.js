global.__basedir = __dirname;
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const path = require('path');

const config = require('./config');
const router = require('./router');
const db = require('./db');
const {
    toArrayBuffer,
    getBufferFromFile,
    lzmaDecompress,
} = require('./helper');

const NLP = require('./helper/nlp.class');
global.nlp = new NLP();


(async () => {
    const modelname = path.join(__basedir, 'model', 'dict.lzma');

    const modelFileBuffer = await getBufferFromFile(modelname).then(result => {
        console.log('[ fs ]', 'model file loaded');
        return result;
    });


    const modelData = await lzmaDecompress(modelFileBuffer).then(result => {
        console.log('[ lzma ]', 'model decompressed');
        return result;
    });


    await nlp.load(toArrayBuffer(modelData)).then(() => {
        console.log('[ nlp ]', 'model loaded');
    });

    // connect to db
    await db.connect(config.db);

    // start the server
    const server = express();
    server.use(bodyParser.json({ limit: '50mb' }));
    server.use(router);
    http.createServer(server).listen(config.server.port, () => {
        console.log('[ express ]', 'server started');
    });

    // // testing
    // const words = [
    //     'przyjaciela',
    //     'ciągu',
    //     'narodził',
    //     'już',
    //     '1832',
    //     'Według',
    //     'informował',
    //     'długi',
    //     'trudny'
    // ];
    // console.log(' - ----------------------------- -');
    // for (let i = 0; i < words.length; i++) {
    //     const lexem = nlp.getLexem(words[i]);
    //     if (lexem)
    //         console.log(` [ lexem ] - ${words[i]}`, lexem.getPOS());
    //     else
    //         console.log(` [ lexem ] - ${words[i]}`, lexem);
    // }
    // console.log(' - ----------------------------- -');

    // const lexem = nlp.getLexem(words[0]);
    // console.log(` [ lexem ] - ${words[0]} (adj 2 noun)`, nlp.getAllFormsOf(lexem).map(a => a.toString()));

})().catch(e => {
    console.error('[ ! ]', 'oops');
    throw e;
});
