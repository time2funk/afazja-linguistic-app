module.exports = {
    server: {
        port: 4444,
    },
    db: {
        uri: 'mongodb://localhost:27017/afazja-app',
    },
    customSearch: {
        apiKey: process.env.apiKey,
        cseId: process.env.cseId,
    },
}