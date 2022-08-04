/* eslint-disable object-shorthand */
const state = () => ({
    /** データ **/
    postItems: [],  // postデータ
    userInfos: [],  // ユーザ情報
    todoItems: [],  // todoデータ
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
    /**
     * todoItemsデータを更新する
     **/
    setTodoItems(state, value) {
        state.todoItems = value === undefined ? [] : value;
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
    /**
     * todoItemsデータを取得する
     **/
    getTodoItems(state) {
        return state.todoItems;
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
    /**
    * Todosデータを取得する
    **/
    async getTodos({ commit }) {
        return await this.$axios.get("/apiJSONplaceholder/todos")
            .then(response => {
                commit('setTodoItems', response.data);
            });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
