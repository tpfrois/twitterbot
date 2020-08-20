const client = require("./client");

async function postTweet(tweet) {
  await client.post("statuses/update", { status: tweet }),
    function (err, tt, res) {
      if (err) throw err;
      throw res;
    };
}

module.exports = { postTweet };
