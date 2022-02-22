

const FeedModel = (db) => {
    const AddFeed = async (id,Title,Content) => {
        if (db.get(id)) return
        const cid = await db.set(id,{title:Title, content:Content})
        console.log("Feed Added",cid)
    }
    const GetFeeds = async () => {
        await db.load()
        const Feeds = db.all
        console.log("All Feeds", Feeds)
        return Feeds
    }
    return {
        addFeed: AddFeed,
        getAllFeeds: GetFeeds
    }
}

window.Feeds = FeedModel