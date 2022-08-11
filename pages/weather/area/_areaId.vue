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
        <v-row v-else-if="weatherInfo !== undefined">
            <!-- -->
            <v-col v-if="weatherInfo.forecast !== undefined" cols="12" class="my-2">
                <div class="text-h6">■天気</div>
                <div class="text-overline"> {{ weatherInfo.forecast.datetime }} 更新</div>
                <div v-for="areaInfo in weatherInfo.forecast.areas" :key="areaInfo.areaName">
                    <div class="text-subtitle-1 my-3">●{{ areaInfo.areaName }}</div>
                    <v-row class="d-flex flex-wrap">
                        <v-card v-for="weatherInfo in areaInfo.weatherInfos" :key="weatherInfo.date" min-width="300"
                            max-width="350" class="mx-3 my-3">
                            <v-card-title>□{{ weatherInfo.date }}</v-card-title>
                            <v-img v-if="weatherInfo.weatherImageUrl.length > 0" width="100"
                                :src="weatherInfo.weatherImageUrl">
                            </v-img>
                            <v-card-subtitle>{{ weatherInfo.weather }}</v-card-subtitle>
                            <v-card-text>
                                <div><strong>・風</strong></div>
                                <div class="text-body-2">{{ weatherInfo.wind }}</div>
                                <div><strong>・波</strong></div>
                                <div class="text-body-2">{{ weatherInfo.wave }}</div>
                            </v-card-text>
                        </v-card>
                    </v-row>
                </div>
            </v-col>

            <!-- 概要 -->
            <v-col v-if="weatherInfo.overview !== undefined" cols="12" class="mx-auto my-2">
                <div class="text-h6">■天気概要</div>
                <div class="text-body2"> {{ weatherInfo.overview.text }} </div>
                <div class="text-overline"> {{ weatherInfo.overview.datetime }} </div>
            </v-col>
            <!-- 週間概要 -->
            <v-col v-if="weatherInfo.overviewWeek !== undefined" cols="12" class="mx-auto my-2">
                <div class="text-h6">■週間天気予報</div>
                <div class="text-body2"> {{ weatherInfo.overviewWeek.text }} </div>
                <div class="text-overline"> {{ weatherInfo.overviewWeek.datetime }} </div>
            </v-col>
            <!-- warining -->
            <v-col v-if="weatherInfo.warning !== undefined" cols="12" class="mx-auto my-2">
                <div class="text-h6">■注意情報</div>
                <div class="text-body2"> {{ weatherInfo.warning.text }} </div>
                <div class="text-overline"> {{ weatherInfo.warning.datetime }} </div>
            </v-col>
        </v-row>
        <v-row v-else>
            <div class="text-h4">表示することができませんでした。</div>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'WeatherAreaPage',
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

