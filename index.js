const https = require('https');
const request = require('superagent');
const Twit = require('twit');
const {keysTokens} = require('./config.js');
const fs = require('fs')

const T = new Twit({
    consumer_key : keysTokens.ck,
    consumer_secret : keysTokens.cs,
    access_token : keysTokens.at,
    access_token_secret : keysTokens.ats,
    timeout_ms : 60*1000,  // optional HTTP request timeout to apply to all requests. 
});

request.get('https://northwitter-api-wqhhzdeecj.now.sh/handles', (err, res) => {
    // if (err) console.log(err);
    // if (res) console.log(res.body.handles);

    // T.get('search/tweets', {q : 'Super Smash Bros. Melee', count : 1}, (err, data, response) => {
    //     console.log(data.statuses[0].text);
    // })
    // console.log(res.body.handles);

    res.body.handles.forEach((twitterName) => {

        T.get('statuses/user_timeline', {screen_name : twitterName, count : 50}, (err, data, response) => {
            
            if (err) {
                console.log(`"${twitterName}" failed to download due to the following error:\n${err}`)
            } else {

                // console.log(data);

                let userInfo = {
                    id : data[0].user.id,
                    screen_name : data[0].user.screen_name,
                    name : data[0].user.name,
                    tweets : {}
                };

                data.forEach((tweetInfo, index) => {
                    userInfo.tweets[index] = data[index].text;
                })

                fs.writeFile(`./twitterData/${data[0].user.id}.txt`, `const userInfo = ${JSON.stringify(userInfo)}`, (err) => {
                    if (err) console.log(err);
                })
            }
        })
    })

})