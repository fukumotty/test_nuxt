/* eslint-disable object-shorthand */
const state = () => ({
    postItems: [],
    userInfos: []
});

const mutations = {
    /**
     * postItemsデータを更新する
     **/
    setPostItems(state, value) {
        state.postItems = value === undefined ? [] : value;
    },
    /**
     * userInfosデータを更新する
     **/
    setUserInfos(state, value) {
        state.userInfos = value === undefined ? [] : value;
    },
};

const getters = {
    /**
     * postItemsデータを取得する
     **/
    getPostItems(state) {
        return state.postItems;
    },
    /**
     * userInfosデータを取得する
     **/
    getUserInfos(state) {
        return state.userInfos;
    },
};

const actions = {
    /**
     * Postsデータを取得する
     **/
    async getPosts({ commit }) {
        return await this.$axios.get("/apiJSONplaceholder/posts")
            .then(response => {
                commit('setPostItems', response.data);
            });
    },
    /**
    * Userデータを取得する
    **/
    async getUser({ commit, dispatch }, userId) {
        return await this.$axios.get("/apiJSONplaceholder/users/" + userId)
            .then(response => {
                const tmpInfos = [];
                dispatch('parseUser', { data: response.data, items: tmpInfos });
                commit('setUserInfos', tmpInfos);
            });
    },
    /**
    * Userデータを整形する
    **/
    parseUser({ dispatch }, { data, items }) {
        for (const key in data) {
            if (typeof data[key] === 'object') {
                items.push({
                    headerFlg: true,
                    key: key,
                    value: ''
                });
                dispatch('parseUser', { data: data[key], items: items });
            } else {
                items.push({
                    headerFlg: false,
                    key: key,
                    value: data[key]
                });
            }
        }
    },

};

export default {
    state,
    mutations,
    getters,
    actions,
}