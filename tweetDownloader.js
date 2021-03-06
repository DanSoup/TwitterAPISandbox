const https = require('https');
const request = require('superagent');
const Twit = require('twit');
const {keysTokens} = require('./config.js');
const fs = require('fs')

// console.log(keysTokens)

const T = new Twit(keysTokens);

request.get('https://northwitter-api-wqhhzdeecj.now.sh/handles', (err, res) => {
    // if (err) console.log(err);
    // if (res) console.log(res.body.handles);

    // T.get('search/tweets', {q : 'Super Smash Bros. Melee', count : 1}, (err, data, response) => {
    //     console.log(data.statuses[0].text);
    // })
    // console.log(res.body.handles);

    // res.body.handles = ['DanielSoup'];

    const listOfHandles = [];

    const noOfHandles = res.body.handles.length;
    let countOfHandles = 0;

    res.body.handles.forEach((twitterName) => {

        T.get('statuses/user_timeline', {screen_name : twitterName, count : 0}, (err, data, response) => {
            
            countOfHandles++;

            if (err) {
                console.log(`"${twitterName}" failed to download due to the following error:\n${err}`);
            } else {

                console.log(`"${twitterName}" data is downloading...`);

                let userInfo = {
                    id : data[0].user.id,
                    screen_name : data[0].user.screen_name,
                    name : data[0].user.name,
                    tweets : {}
                };

                data.forEach((tweetInfo, index) => {
                    console.log(data[index].text)
                    userInfo.tweets[index] = {
                        tweet : data[index].text,
                        created_at : data[index].created_at,
                        id : data[index].id
                    };
                })

                fs.writeFile(`./twitterData/${userInfo.screen_name}.json`, JSON.stringify(userInfo, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`"${twitterName}" file created/updated.`)
                    };

                    listOfHandles.push(twitterName);

                    if (countOfHandles === noOfHandles) {

                        listOfHandles.sort((a, b) => {
                            if ([a.toLowerCase(), b.toLowerCase()].sort()[0] === a.toLowerCase()) {
                                return -1
                            } else return 1
                        });

                        fs.writeFile(`./twitterData/@userHandles.json`, JSON.stringify(listOfHandles, null, 2), (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`@userHandles file created`)
                            }
                        });
                    };
                        // fs.readFile(`./twitterData/${userInfo.screen_name}.json`, (err, data) => {
                    //     console.log(JSON.parse(data.toString()).id);
                    // });
                })

            }
        })
    })

})