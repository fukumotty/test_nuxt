const state = () => ({
    rssInfo: [
        {
            name: "はてな（人気）",
            category: "hatena-hot",
            targetUrl: "/apiHatena/hotentry/it.rss"
        },
        {
            name: "はてな（新着）",
            category: "hatena-new",
            targetUrl: "/apiHatena/entrylist/it.rss"
        },
        {
            name: "YahooNews（主要）",
            category: "yahoo-news-top",
            targetUrl: "/apiYahooNews/rss/topics/top-picks.xml"
        },
        {
            name: "YahooNews（国内）",
            category: "yahoo-news-domestic",
            targetUrl: "/apiYahooNews/rss/categories/domestic.xml"
        },
        {
            name: "YahooNews（国際）",
            category: "yahoo-news-world",
            targetUrl: "/apiYahooNews/rss/categories/world.xml"
        },
        {
            name: "ITMedia（新着）",
            category: "it-media-new",
            targetUrl: "/apiITMedia/rss/2.0/news_bursts.xml"
        },
    ]
});

const getters = {
    // indexから情報を取得
    getRssInfoFromIndex: state => (index) => {
        return state.rssInfo.length > index ? state.rssInfo[index] : undefined;
    },
    // categoryから情報を取得
    getRssInfoFromCategory: state => (category) => {
        return state.rssInfo.find(element => element.category === category);
    },
    // categoryからindex情報を取得
    getRssInfoIndexFromCategory: state => (category) => {
        return state.rssInfo.findIndex(element => element.category === category);
    }
};

export default {
    state,
    getters,
}