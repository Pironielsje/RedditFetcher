## RedditFetcher

**Docs:** [github.com/Pironielsje/RedditFetcher/Docs/DOCS.md](https://github.com/Pironielsje/RedditFetcher/Docs/DOCS.md)
**Support:** [dsc.gg/icymountains](https://dsc.gg/icymountains)
**Npm:** [npmjs.com/redditfetcher](https://npmjs.com/package/redditfetcher)

RedditFetcher is a simple package that fetches posts from a given subreddits.

## Example
```js
const {Client, Intents} = require('discord.js')
const redditFetcher = require('RedditFetcher')

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

client.on(`ready`, () => {
    console.log(`ready`)
})

client.on('messageCreate', async(message) => {

    const msgArray = message.content.split(' ')

    const command = msgArray[0]

    if(command === `.meme`) {
        redditFetcher({
            subreddit: 'memes',
            sorting: "hot", // or new
            nsfwAllowed: false,
            modPostAllowed: false,
            crossPostAllowed: false,
            videoAllowed: true
        }).then(post => {
            message.reply(post.url)
        })
    }

})

client.login(`Bot token here`)
```

## Installation

**Linux & Windows**
- `npm i RedditFetcher`

***Note:** Windows users may need to do additional steps [listed here](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md).*
**Mac**
1. **Install:** XCode
2. **Run:** `npm i -g node-gyp` in terminal
3. **Run:** `node-gyp --python /path/to/python2.7` (skip this step if you didn't install python3.x)
4. **Run:** `npm i RedditFetcher`

## Support
I worked very hard on this so if you want to support me, you can do that via [tipeestream.com/pironielsje/donation](https://www.tipeeestream.com/pironielsje/donation)