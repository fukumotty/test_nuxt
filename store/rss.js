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
        }
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