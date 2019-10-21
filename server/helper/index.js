const fs = require('fs');
const lzma = require("lzma");


const toArrayBuffer = function (buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
};
module.exports.toArrayBuffer = toArrayBuffer;


const getBufferFromFile = async function (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, buffer) {
            if (err) reject(err);
            else resolve(buffer);
        });
    });
};
module.exports.getBufferFromFile = getBufferFromFile;


const lzmaDecompress = async function (buffer) {
    return new Promise((resolve, reject) => {
        lzma.decompress(new Uint8Array(buffer), (result, err) => {
            if (err) reject(err);
            else resolve(result);
        }, percent => {
            console.log(` [ lzma ] - loading  ${Math.round(percent * 100 * 10) / 10}%`);
        });
    });
};
module.exports.lzmaDecompress = lzmaDecompress;