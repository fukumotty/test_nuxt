<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h4 mt-3">天気予報表示</div>
                <div class="text-h6 mt-3">「気象庁」のJSONを使用して、天気予報情報を表示します。</div>
                <v-btn outlined color="primary" class="my-3" @click="apiLink">気象庁</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="text-h6 mt-3">{{ weatherAreaInfo }}</div>
            </v-col>
        </v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if='loadingFlg' :color="$const.loadingProgress.color"
            :width="$const.loadingProgress.width" :size="$const.loadingProgress.size">
        </my-loading-progress>
        <!--  Error発生時 -->
        <my-error-view v-else-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <my-weather-info-view v-else-if="weatherInfo !== undefined" :weather-info="weatherInfo">
        </my-weather-info-view>
        <v-row v-else>
            <div class="text-h4">表示することができませんでした。</div>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'
import MyWeatherInfoView from '~/components/MyWeatherInfoView'

export default {
    name: 'WeatherAreaPage',
    components: {
        MyErrorView,
        MyLoadingProgress,
        MyWeatherInfoView,
    },
    validate({ app, params }) {
        return params.areaId !== undefined && app.$getWeatherAreaInfo(params.areaId) !== undefined;
    },
    data() {
        return {
            error: {
                flg: false,
                title: "エラー",
                message: null,
            },
        }
    },
    computed: {
        ...mapGetters({
            loadingFlg: 'view/getLoadingFlg',
            weatherInfo: 'weather/getWeatherInfo',
        }),
        weatherAreaInfo() {
            const areaInfo = this.$getWeatherAreaInfo(this.$route.params.areaId);
            if (areaInfo === undefined) {
                return "";
            } else {
                return areaInfo.region + " > " + areaInfo.name;
            }
        }

    },
    watch: {
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            updateLoadingFlg: 'view/updateLoadingFlg',
            clearWeatherInfo: 'weather/clearWeatherInfo',
            getWeatherInfo: 'weather/getWeatherInfo',
        }),
        load() {
            this.initError();
            this.clearWeatherInfo();
            this.getWeatherInfo(this.$route.params.areaId).catch((err) => {
                this.setError(err.errorMessage);
            });
        },
        initError() {
            this.error.flg = false;
            this.error.message = null;
        },
        setError(message) {
            this.error.flg = true;
            this.error.message = message;
        },
        // 外部サイトを開く
        apiLink() {
            window.open("https://www.jma.go.jp/jma/index.html", '_blank');
        },
    },
}
</script>

