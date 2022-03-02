// Reddit Fetcher file

const RedditFetcherError = require('./errors/RedditFetcherError')
const fetch = import('node-fetch')

module.exports = async function redditFetcher({subreddit, sorting = 'top', nsfwAllowed, modPostAllowed, crossPostAllowed, videoAllowed}) {
    return new Promise((resolve, reject) => {

        if(!subreddit)
            return reject(new Error('Missing required argument: "subreddit"'))

        
        if(typeof(subreddit) !== "string")
            return reject(new TypeError(`Expected type "string" but got "${typeof(subreddit)}"`))

        if(sorting && typeof(sorting) !== "string")
            return reject(new TypeError(`Expected type "string" but got "${typeof(sorting)}"`));

        if(nsfwAllowed && typeof(nsfwAllowed) !== "boolean")
            return reject(new TypeError(`Expected type "string" but got "${typeof(sorting)}"`));

            if (modPostAllowed && typeof(modPostAllowed) !== 'boolean')
            return reject(new TypeError(`Expected type "boolean" but got "${typeof(modPostAllowed)}"`));

        if (crossPostAllowed && typeof(crossPostAllowed) !== 'boolean')
            return reject(new TypeError(`Expected type "boolean" but got "${typeof(crossPostAllowed)}"`));

        if (videoAllowed && typeof(videoAllowed) !== 'boolean')
            return reject(new TypeError(`Expected type "boolean" but got "${typeof(videoAllowed)}"`));

        sorting = sorting.toLowerCase()
        subreddit = subreddit.toLowerCase()

        const url = `https://reddit.com/r/${subreddit}.json?sort=${sorting}&t=week`

        fetch(url).then(res => res.json())
            .then(body => {

                let found = body.data.children

                if(!found.length)
                    return reject(new RedditFetcherError(`Subreddit ${subreddit} not found or no available post data.`))

                if (!nsfwAllowed)
                    found = found.filter(p => !p.data.over_18);

                if (!modPostAllowed)
                    found = found.filter(p => !p.data.distinguished);

                if (!crossPostAllowed)
                    found = found.filter(p => !p.data.crosspost_parent_list);

                if (!videoAllowed)
                    found = found.filter(p => !p.is_video);    

                if(!found.length)
                    return reject(new RedditFetcherError(`Unable to find a post that meets criteria. There may be an error in the options.`))

                let randInt = Math.floor(Math.random() * found.length)

                resolve(found[randInt].data)
            })

    })
}