/* eslint-disable object-shorthand */
const state = () => ({
    /** データ **/
    postItems: [],  // postデータ
    userInfos: [],  // ユーザ情報
    todoItems: [],  // todoデータ
    albumItems: [], // アルバム
    photoItem: {},  // photoデータ
    /** 表示管理用 **/
    listDisplayFlg: false, // リスト表示切替フラグ
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
    /**
     * albumItemsデータを更新する
     **/
    setAlbumItems(state, value) {
        state.albumItems = value === undefined ? [] : value;
    },
    /**
    * photoItemデータを更新する
    **/
    setPhotoItem(state, { albumInfo, photoItems }) {
        state.photoItem = {
            album: albumInfo === undefined ? {} : albumInfo,
            photos: photoItems === undefined ? [] : photoItems
        };
    },
    // リスト表示切替フラグを更新
    setListDisplayFlg(state, value) {
        state.listDisplayFlg = value;
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
    /**
     * albumItemsデータを取得する
     **/
    getAlbumItems(state) {
        return state.albumItems;
    },
    /**
    * photoItemデータを取得する
    **/
    getPhotoItem(state, value) {
        return state.photoItem;
    },
    // リスト表示切替フラグを取得
    getListDisplayFlg(state) {
        return state.listDisplayFlg;
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
    /**
    * Albumsデータを取得する
    **/
    async getAlbums({ commit }) {
        return await this.$axios.get("/apiJSONplaceholder/albums")
            .then(response => {
                commit('setAlbumItems', response.data);
            });
    },
    /**
    * Photosデータを取得する
    **/
    async getPhotos({ commit }, albumId) {
        return await Promise.all(
            [
                this.$axios.get("/apiJSONplaceholder/albums/" + albumId),
                this.$axios.get("/apiJSONplaceholder/photos", {
                    params: {
                        albumId: albumId
                    }
                }),
            ]
        ).then(responses => {
            commit('setPhotoItem', {
                albumInfo: responses[0].data,
                photoItems: responses[1].data
            });
        });
    },
    /**
    * リスト表示切替フラグを更新する
    **/
    updateListDisplayFlg({ commit }, value) {
        commit('setListDisplayFlg', value);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
