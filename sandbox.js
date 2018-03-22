const fs = require('fs')

fs.readFile(`./twitterData/anielSoup.json`, (err, data) => {
    console.log(err);
    console.log(JSON.parse(data.toString()).id);
});