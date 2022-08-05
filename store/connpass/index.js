/* eslint-disable object-shorthand */
const state = () => ({
    /** データ **/
    events: [],       // event情報
});

const mutations = {
    /**
     * 
     **/
    setEvents(state, value) {
        state.events = value === undefined ? [] : value;
    },
};

const getters = {
    /**
     * 
     **/
    getEvents(state) {
        return state.events;
    },
};

const actions = {
    clearEvents({ commit }) {
        commit('setEvents', []);
    },

    /**
     * 
     **/
    async getEventInfo({ commit, dispatch }, { dates, keyword }) {
        const params = {
            order: 2,
            count: 100,
        };
        const paramDates = this.$fromToDatesString(dates);
        console.log("getEventInfo paramDates:" + paramDates);
        if (paramDates.length > 0) {
            params.ymd = paramDates;
        }
        if (keyword !== undefined && keyword != null && keyword.length > 0) {
            params.keyword = keyword;
        }
        console.log("getEventInfo:" + JSON.stringify(params));
        return await this.$axios.get("/apiConnpass/api/v1/event/", { params: params }).then(response => {
            commit('setEvents', response.data.events);
        });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
