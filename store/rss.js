/* eslint-disable object-shorthand */
/* eslint-disable no-empty-pattern */

const parseString = require('xml2js').parseString;

const state = () => ({
    listDisplayFlg: false, // リスト表示切替フラグ
    rssResultData: {},
});

const mutations = {
    // リスト表示切替フラグを更新
    setListDisplayFlg(state, value) {
        state.listDisplayFlg = value;
    },
    // リスト表示切替フラグを更新
    setRssResultData(state, { category, value }) {
        state.rssResultData[category] = value === undefined ? [] : value;
    }
};

const getters = {
    // リスト表示切替フラグを取得
    getListDisplayFlg: state => () => {
        return state.listDisplayFlg;
    },

    /**
     * categoryに合わせた結果を取得する
     **/
    getRssResultData: state => (category) => {
        if (state.rssResultData[category] === undefined) {
            return [];
        } else {
            return state.rssResultData[category];
        }
    }
};

const actions = {
    /**
     * RSSデータを取得する
     **/
    async getRssData({ commit, dispatch }, category) {
        const rssInfo = this.$getRssInfoFromCategory(category);
        if (rssInfo === undefined) {
            throw new Error('予期せぬエラーが発生しました。');
        }
        return await this.$axios.get(rssInfo.targetUrl)
            .then(response => {
                parseString(response.data, (err, result) => {
                    dispatch('parse', { err: err, category: category, json: result });
                });
                return response;
            });
    },
    /**
     * パース処理（XML -> JSON）
     */
    async parse({ commit, dispatch, store }, { err, category, json }) {
        let key = '';
        if (category.includes('hatena')) {
            key = 'parseHatena';
        } else if (category.includes('yahoo-news')) {
            key = 'parseYahooNews';
        } else if (category.includes('it-media')) {
            key = 'parseITMedia';
        } else {
            throw new Error('予期せぬエラーが発生しました。');
        }
        const items = await dispatch(key, { err: err, json: json });
        await commit('setRssResultData', { category: category, value: items });

    },
    /**
     * パース処理（XML -> JSON）
     * はてなブックマークを整形
     */
    parseHatena({ dispatch }, { err, json }) {
        const items = [];
        if (err) {
            throw new Error('予期せぬエラーが発生しました。');
        } else {
            const jsonItem = json["rdf:RDF"].item;
            for (const key in jsonItem) {
                const item = jsonItem[key];
                items.push({
                    title: item.title === undefined ? "" : item.title[0],
                    description: item.description === undefined ? "" : item.description[0],
                    link: item.link === undefined ? "" : item.link[0],
                    image: item.image === undefined ? "" : item.image[0],
                    date: item["dc:date"] === undefined ? "" : this.$dateformat_YYYYMMDD_HHmmsss(item["dc:date"][0]),
                });
            }
        }
        return items;
    },
    /**
     * パース処理（XML -> JSON）
     * Yahooニュースを整形
     */
    parseYahooNews({ }, { err, json }) {
        const items = [];
        if (err) {
            throw new Error('予期せぬエラーが発生しました。');
        } else {
            const jsonItem = json.rss.channel[0].item;
            for (const key in jsonItem) {
                const item = jsonItem[key];
                items.push({
                    title: item.title === undefined ? "" : item.title[0],
                    description: item.description === undefined ? "" : item.description[0],
                    link: item.link === undefined ? "" : item.link[0],
                    image: item.image === undefined ? "" : item.image[0],
                    date: item.pubDate === undefined ? "" : this.$dateformat_YYYYMMDD_HHmmsss(item.pubDate[0]),
                });
            }
        }
        return items;
    },
    /**
     * パース処理（XML -> JSON）
     * ITMediaを整形
     */
    parseITMedia({ }, { err, json }) {
        const items = [];
        if (err) {
            throw new Error('予期せぬエラーが発生しました。');
        } else {
            const jsonItem = json.rss.channel[0].item;
            for (const key in jsonItem) {
                const item = jsonItem[key];
                items.push({
                    title: item.title === undefined ? "" : item.title[0],
                    description: item.description === undefined ? "" : item.description[0],
                    link: item.link === undefined ? "" : item.link[0],
                    image: item.image === undefined ? "" : item.image[0],
                    date: item.pubDate === undefined ? "" : this.$dateformat_YYYYMMDD_HHmmsss(item.pubDate[0]),
                });
            }
        }
        return items;
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}