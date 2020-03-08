module.exports = {
    server: {
        port: 4444,
    },
    db: {
        uri: 'mongodb://localhost:27017/afazja-app',
    },
    customSearch: {
        apiKey: process.env.GOOGLE_API_KEY,
        cseId: process.env.GOOGLE_CSE_ID,
    },
}