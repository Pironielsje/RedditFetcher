class RedditFetcherError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'RedditFetcherError'
    }
}

module.exports = RedditFetcherError;