<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h4 mt-3">駅情報表示</div>
                <div class="text-h6 mt-3">「HeartRails Express」のAPIを使用して、駅情報を表示します。</div>
                <v-btn outlined color="primary" @click="detailLink()" class="my-3">「HeartRails Express」</v-btn>
            </v-col>
        </v-row>
        <my-error-view v-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <v-row>
            <v-col>
                <!-- エリア -->
                <v-select v-if="areaItems.length > 0" v-model="selectArea" :items="areaItems" label="エリア" outlined>
                </v-select>
                <v-alert v-if="areaItems.length > 0 && selectArea.length === 0" dense outlined type="error">
                    エリアを選択してください。</v-alert>
                <!-- 都道府県 -->
                <v-select v-if="prefItems.length > 0" v-model="selectPref" :items="prefItems" label="都道府県" outlined>
                </v-select>
                <v-alert v-if="prefItems.length > 0 && selectPref.length === 0" dense outlined type="error">
                    都道府県を選択してください。</v-alert>
                <!-- 路線 -->
                <v-select v-if="lineItems.length > 0" v-model="selectLine" :items="lineItems" label="路線" outlined>
                </v-select>
                <v-alert v-if="lineItems.length > 0 && selectLine.length === 0" dense outlined type="error">
                    路線を選択してください。</v-alert>
            </v-col>
        </v-row>
        <v-row>
            <my-loading-progress v-if='loadingFlg' :color="$const.loadingProgress.color"
                :width="$const.loadingProgress.width" :size="$const.loadingProgress.size">
            </my-loading-progress>
            <v-col v-if="stationItems.length > 0">
                <v-divider></v-divider>
                <div class="font-weight-bold ml-8 mb-2 mt-3">
                    <strong>{{ selectLine }} </strong>の駅情報
                </div>
                <v-timeline align-top dense>
                    <v-timeline-item v-for="station in stationItems" :key="station.name" :color="primary" small>
                        <div>
                            <div class="font-weight-normal">
                                <strong>{{ station.name }}</strong>
                            </div>
                            <div>
                                緯度(y):{{ station.y }} 経度(x)：{{ station.x }}
                                <v-btn outlined color="primary" class="ml-4 pa-0 text-caption"
                                    @click="openGoogleMap(station)">MAP
                                </v-btn>
                            </div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'

export default {
    name: 'ExpressHeartrailsPage',
    components: {
        MyErrorView,
        MyLoadingProgress,
    },
    data() {
        return {
            selectArea: "",
            selectPref: "",
            selectLine: "",
            error: {
                flg: false,
                title: "エラー",
                message: null,
            },
            headers: [
                {
                    text: 'name', value: 'name',
                },
                {
                    text: 'x', value: 'x',
                },
                {
                    text: 'y', value: 'y',
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            loadingFlg: "view/getLoadingFlg",
            areaItems: "expressheartrails/getArea",
            prefItems: "expressheartrails/getPrefecture",
            lineItems: "expressheartrails/getLine",
            stationItems: "expressheartrails/getStation",
        }),
    },
    watch: {
        selectArea(newValue, oldValue) {
            console.log("watch:selectArea:" + oldValue + " -> " + newValue + " =>data:seletArea:" + this.selectArea);
            if (newValue.length > 0) {
                this.getPrefsInfo();
            } else {
                this.clearPrefectures();
            }
        },
        selectPref(newValue, oldValue) {
            console.log("watch:selectPref:" + oldValue + " -> " + newValue + " =>data:selectPref:" + this.selectPref);
            if (newValue.length > 0) {
                this.getLinesInfo();
            } else {
                this.clearLines();
            }
        },
        selectLine(newValue, oldValue) {
            console.log("watch:selectLine:" + oldValue + " -> " + newValue + " =>data:selectLine:" + this.selectLine);
            if (newValue.length > 0) {
                this.getStationsInfo();
            } else {
                this.clearStations();
            }
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            getAreas: "expressheartrails/getAreas",
            getPrefectures: "expressheartrails/getPrefectures",
            getLines: "expressheartrails/getLines",
            getStations: "expressheartrails/getStations",
            clearPrefectures: "clearPrefectures",
            clearLines: "clearLines",
            clearStations: "clearStations",
        }),
        // データを取得する
        load() {
            this.getAreasInfo();
        },
        getAreasInfo() {
            this.initError();
            this.selectArea = "";
            this.selectPref = "";
            this.selectLine = "";
            this.getAreas().catch((err) => {
                this.setError(err.errorMessage);
            });
        },
        getPrefsInfo() {
            this.selectPref = "";
            this.selectLine = "";

            this.getPrefectures(this.selectArea).catch(() => {
                this.selectArea = "";
            });
        },
        getLinesInfo() {
            this.selectLine = "";
            this.getLines(this.selectPref).catch(() => {
                this.selectPref = "";
            });
        },
        getStationsInfo() {
            this.clearStations();
            this.getStations(this.selectLine).catch(() => {
                this.selectLine = "";
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
        detailLink() {
            window.open("http://express.heartrails.com/api.html", '_blank');
        },
        // 外部サイトを開く
        openGoogleMap(item) {
            window.open("http://maps.google.co.jp/maps?q=" + item.y + "," + item.x, '_blank');
        }
    }
}
</script>

