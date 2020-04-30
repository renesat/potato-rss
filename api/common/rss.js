const Parser = require('rss-parser');
const cheerio = require('cheerio');
const got = require('got');
const crypto = require('crypto');

const getNews = async (source_url) => {

    let url = undefined;
    try {
        const response = await got(source_url);
        let data = response.body;

        const $ = cheerio.load(data);
        url = $('link[type="application/rss+xml"]').attr('href');

        if (url === undefined) {
            url = source_url;
        }
    } catch(_) {
        url = source_url;
    }

    let parser = new Parser();
    let feed = await parser.parseURL(url);

    let items = feed.items.map(item => {
        return {
            guid: item['guid'],
            title: item['title'],
            content: item['content'],
            favourite: false,
            date: Date.parse(item['isoDate']),
            link: item['link'],
            rss_data: JSON.stringify(item),
            rss_data_hash: crypto.createHash('sha1').
                update(JSON.stringify(item)).
                digest('base64')
        };
    });
    return items;
};

module.exports = {
    getNews: getNews,
};
