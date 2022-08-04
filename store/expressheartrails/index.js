/* eslint-disable object-shorthand */
const state = () => ({
    /** データ **/
    area: [],       // area情報
    prefecture: [], // prefecture都道府県情報
    line: [],       // 路線情報
    station: []     // 駅情報
});

const mutations = {
    /**
     * 
     **/
    setArea(state, value) {
        state.area = value === undefined ? [] : value;
    },
    /**
     * 
     **/
    setPrefecture(state, value) {
        state.prefecture = value === undefined ? [] : value;
    },
    /**
     * 
     **/
    setLine(state, value) {
        state.line = value === undefined ? [] : value;
    },
    /**
     * 
     **/
    setStation(state, value) {
        state.station = value === undefined ? [] : value;
    },
};

const getters = {
    /**
     * 
     **/
    getArea(state) {
        return state.area;
    },
    /**
     * 
     **/
    getPrefecture(state) {
        return state.prefecture;
    },
    /**
     * 
     **/
    getLine(state) {
        return state.line;
    },
    /**
     * 
     **/
    getStation(state) {
        return state.station;
    },
};

const actions = {
    clearPrefectures({ commit }) {
        commit('setPrefecture', []);
    },
    clearLines({ commit }) {
        commit('setLine', []);
    },
    clearStations({ commit }) {
        commit('setStation', []);
    },
    /**
     * 
     **/
    async getAreas({ commit, dispatch }) {
        return await this.$axios.get("/apiExpressHeartrails/api/json", {
            params: {
                method: "getAreas"
            }
        }).then(response => {
            commit('setArea', response.data.response.area);
            dispatch('clearPrefectures');
            dispatch('clearLines');
            dispatch('clearStations');
        });
    },
    /**
     * 
     **/
    async getPrefectures({ commit, dispatch }, area) {
        return await this.$axios.get("/apiExpressHeartrails/api/json", {
            params: {
                method: "getPrefectures",
                area: area
            }
        }).then(response => {
            commit('setPrefecture', response.data.response.prefecture);
            dispatch('clearLines');
            dispatch('clearStations');
        });
    },
    /**
     * 
     **/
    async getLines({ commit, dispatch }, prefecture) {
        return await this.$axios.get("/apiExpressHeartrails/api/json", {
            params: {
                method: "getLines",
                prefecture: prefecture
            }
        }).then(response => {
            commit('setLine', response.data.response.line);
            dispatch('clearStations');
        });
    },
    /**
     * 
     **/
    async getStations({ commit }, line) {
        return await this.$axios.get("/apiExpressHeartrails/api/json", {
            params: {
                method: "getStations",
                line: line
            }
        }).then(response => {
            commit('setStation', response.data.response.station);
        });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
