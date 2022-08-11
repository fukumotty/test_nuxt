<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h4 mt-3">天気予報 表示</div>
                <div class="text-h6 mt-3">「気象庁」の天気予報情報を表示します。エリアを選択してください。</div>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-wrap">
            <v-card v-for="regionInfo in $weatherConst.areaInfo" :key="regionInfo.region" min-width="300"
                class="mx-auto my-3">
                <v-card-title>{{ regionInfo.region }}</v-card-title>
                <v-card-text>
                    <ul>
                        <li v-for="areaInfo in regionInfo.area" :key="areaInfo.id">
                            <nuxt-link :to="'/weather/area/' + areaInfo.id" no-prefetch>{{
                                    areaInfo.name
                            }}</nuxt-link>
                        </li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'WeatherAreaSelectPage',
    data() {
        return {
        }
    },
    computed: {
        areaTitle: {

        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
    },
}
</script>

