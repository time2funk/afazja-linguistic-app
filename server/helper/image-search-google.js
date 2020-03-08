const got = require("got");
const queryStirng = require("querystring");

const baseUrl = 'https://www.googleapis.com/';

module.exports = class ImageSearch {
    constructor(cseId, apiKey) {
        this.cseId = cseId;
        this.apiKey = apiKey;
        if (!this.cseId || !this.apiKey) {
            throw new Error('Api Key Or CSE ID is required!');
        }
    }

    search(query, options = {}) {
        if (!query || typeof query !== 'string') {
            throw new Error('Expected a query in string format!');
        }
        return got(baseUrl + 'customsearch/v1?' + this.getOptions(query, options), {
            json: true
        }).then(this.buildResult);
    }

    getOptions(query, options) {
        let result = {
            q: query.replace(/\s/g, '+'),
            searchType: 'image',
            cx: this.cseId,
            key: this.apiKey
        };
        if (options.page) {
            result.start = options.page;
        }
        if (options.num) {
            result.num = options.num;
        }
        return queryStirng.stringify(Object.assign(result, options));
    }

    buildResult(res) {
        return (res.body.items || []).map((item) => {
            return {
                'url': item.link,
                'thumbnail': item.image.thumbnailLink,
                'snippet': item.title,
                'context': item.image.contextLink
            };
        });
    }
};