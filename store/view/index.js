/* eslint-disable object-shorthand */
/* eslint-disable no-empty-pattern */
const state = () => ({
    loadingFlg: true, // loading中フラグ
});

const mutations = {
    // loading中フラグを更新
    setLoadingFlg(state, value) {
        state.loadingFlg = value;
    }
};

const getters = {
    // loading中フラグを取得
    getLoadingFlg(state) {
        return state.loadingFlg;
    },
};

const actions = {
    /**
     * loading中フラグを更新する
     **/
    updateLoadingFlg({ commit }, value) {
        return commit('setLoadingFlg', value);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}