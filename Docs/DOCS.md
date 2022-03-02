## Documentation

This is the official documentation for RedditFetcher

## Installation

To install this package run **npm i RedditFetcher**

# Requiring the package

```js
const redditFetch = require('RedditFetch)
```

# Example

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

If you have any questions you can ask them in: [dsc.gg/icymountains](https://dsc.gg/icymountains)