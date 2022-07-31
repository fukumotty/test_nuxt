const state = () => ({
    listDisplayFlg: false // リスト表示切替フラグ
});

const mutations = {
    // リスト表示切替フラグを更新
    setListDisplayFlg(state, value) {
        state.listDisplayFlg = value;
    }
};

const getters = {
    // リスト表示切替フラグを取得
    getListDisplayFlg: state => () => {
        return state.listDisplayFlg;
    }
};

const actions = {

};

export default {
    state,
    mutations,
    getters,
    actions,
}