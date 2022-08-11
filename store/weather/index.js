/* eslint-disable object-shorthand */
const state = () => ({
    weatherInfo: {}
});

const mutations = {
    /**
     * 
     **/
    setWeatherInfo(state, { forecast, overview, overviewWeek, warning }) {
        const forecastInfo = {
            datetime: this.$dateformat_YYYYMMDD_hhmmss(forecast[0].reportDatetime),
            areas: []
        };
        const timeDefines = forecast[0].timeSeries[0].timeDefines;
        for (const i in forecast[0].timeSeries[0].areas) {
            const areaInfo = forecast[0].timeSeries[0].areas[i];
            const areaWeatherInfo = {
                areaName: areaInfo.area.name,
                weatherInfos: []
            };
            for (let i = 0; i < timeDefines.length; i++) {
                areaWeatherInfo.weatherInfos.push({
                    date: this.$dateformat_MMDD_ddd(timeDefines[i]),
                    weatherCode: areaInfo.weatherCodes[i],
                    weatherImageUrl: this.$getWeatherImageUrl(areaInfo.weatherCodes[i]),
                    weather: areaInfo.weathers[i],
                    wind: areaInfo.winds === undefined ? "" : areaInfo.winds[i],
                    wave: areaInfo.waves === undefined ? "" : areaInfo.waves[i]
                });
            }
            forecastInfo.areas.push(areaWeatherInfo);
        }
        const temp = {
            forecast: forecastInfo,
            overview: {
                datetime: this.$dateformat_YYYYMMDD_hhmmss(overview.reportDatetime),
                text: overview.text,
            },
            overviewWeek: {
                datetime: this.$dateformat_YYYYMMDD_hhmmss(overviewWeek.reportDatetime),
                text: overviewWeek.text,
            },
            warning: {
                datetime: this.$dateformat_YYYYMMDD_hhmmss(warning.reportDatetime),
                text: warning.headlineText,
            }
        }
        state.weatherInfo = temp;
    },
    clearWeatherInfo(state) {
        state.weatherInfo = {};
    }
};

const getters = {
    /**
     * 
     **/
    getWeatherInfo(state) {
        return state.weatherInfo;
    },
};

const actions = {
    clearWeatherInfo({ commit }) {
        commit('clearWeatherInfo');
    },
    /**
   * Weatherデータを取得する
   **/
    async getWeatherInfo({ commit }, areaId) {
        const areaInfo = this.$getWeatherAreaInfo(areaId);
        return await Promise.all(
            [
                this.$axios.get("/apiWeather/bosai/forecast/data/forecast/" + areaId + ".json"),
                this.$axios.get("/apiWeather/bosai/forecast/data/overview_forecast/" + areaId + ".json"),
                this.$axios.get("/apiWeather/bosai/forecast/data/overview_week/" + areaInfo.centerId + ".json"),
                this.$axios.get("/apiWeather/bosai/warning/data/warning/" + areaId + ".json"),
            ]
        ).then(responses => {
            commit('setWeatherInfo', {
                forecast: responses[0].data,
                overview: responses[1].data,
                overviewWeek: responses[2].data,
                warning: responses[3].data,
            });
        });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
