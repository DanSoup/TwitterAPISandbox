const fs = require('fs');

function handleApi (req, res) {

    res.setHeader('Content-Type', 'text/json');
    res.statusCode = 200;
    res.write(JSON.stringify('This is the home page. What are you trying to achieve?'));
    res.end();

};

function handleHandles (req, res) {

    fs.readFile('./twitterData/@userHandles.json', 'utf8', (err, handles) => {
        // handles = JSON.stringify(fs.readFile('./twitterData/@userHandles.json'))
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.write(handles);
        res.end();
    }); 

};

function getUserInfo (req, res) {

    const username = req.url.slice(12);
    console.log(`Fetching information for ${username}`);

    fs.readFile(`./twitterData/${username}.json`, 'utf8', (err, userInfoFull) => {
        console.log(err)
        res.setHeader('Content-Type', 'text/json');
        if (err) {
            res.statusCode = 404;
            res.write(JSON.stringify('ERROR 404: We do not have information on that user.'));
        } else {
            res.statusCode = 200;
            const userInfo = JSON.parse(userInfoFull);
            delete userInfo.tweets;
            res.write(JSON.stringify(userInfo, null, 2));
        }
        res.end();
    })

}

module.exports = {handleApi, handleHandles, getUserInfo}