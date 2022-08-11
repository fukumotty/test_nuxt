<template>
    <v-row v-if="weatherInfo !== undefined">
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
</template>

<script>
export default {
    name: 'MyWeatherInfoView',
    props: {
        // eslint-disable-next-line vue/require-prop-types
        weatherInfo: {
            type: Object,
            required: false,
            default: () => { }
        },
    }
}
</script>
