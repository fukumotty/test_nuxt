<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h4 mt-3">Connpass イベント表示</div>
                <div class="text-h6 mt-3">「Connpass」のAPIを使用して、イベント情報を表示します。</div>
                <v-btn outlined color="primary" class="my-3" @click="apiLink">Connpass</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <!-- 条件入力 -->
            <v-col>
                <v-dialog ref="dialog" v-model="datePickerDialog" :return-value.sync="dates" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateRangeText" label="開催日（期間）" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on">
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="dates" locale="jp-ja" :day-format="date => new Date(date).getDate()" range>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="datePickerDialog = false">
                            キャンセル
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save([])">
                            クリア
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(dates)">
                            決定
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
                <v-text-field v-model="keyword" label="キーワード" prepend-icon="mdi-pencil">
                </v-text-field>
                <v-alert v-if="alert.length > 0" dense outlined type="error">{{ alert }}</v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer> </v-spacer>
            <v-col>
                <v-btn :disabled="alert.length > 0 || loadingFlg" :loading="loadingFlg" color="primary" @click="search">
                    検索</v-btn>
            </v-col>
            <v-spacer> </v-spacer>
        </v-row>
        <v-row>
            <v-col v-if="errorMessage.length > 0">
                <v-alert border="top" color="red lighten-2" dark>
                    {{ errorMessage }}
                </v-alert>
            </v-col>
            <v-col v-else-if="events.length > 0">
                <v-card>
                    <v-card-title>
                        Events LIST
                        <v-spacer></v-spacer>
                        <v-text-field v-model="eventSearchWord" append-icon="mdi-magnify" label="絞り込み" single-line
                            hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="events" :search="eventSearchWord"
                        no-data-text="表示するイベントがありません。" no-results-text="表示するイベントがありません。">
                        <template v-slot:[`item.title`]="{ item }">
                            <div class="subtitle-2"><strong>{{ item.title }}</strong></div>
                            <div class="text-caption">{{ item.catch }}</div>
                            <v-chip v-if="item.hash_tag.length > 0" class="ma-2 text-overline" color="gray">
                                {{ item.hash_tag }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.address`]="{ item }">
                            <v-btn v-if="item.lat !== null" text class="text-caption px-0" @click="openGoogleMap(item)">
                                {{ item.address }}</v-btn>
                            <div v-else class="text-caption">{{ item.address }}</div>
                        </template>
                        <template v-slot:[`item.started_at`]="{ item }">
                            {{ $dateformat_YYYYMMDD_HHmmss(item.started_at) }}
                        </template>
                        <template v-slot:[`item.ended_at`]="{ item }">
                            {{ $dateformat_YYYYMMDD_HHmmss(item.ended_at) }}
                        </template>
                        <template v-slot:[`item.event_url`]="{ item }">
                            <v-btn outlined color="primary" class="text-caption" @click="detailLink(item)">詳しくみる</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col v-else-if="!loadingFlg && alert.length === 0 && isSearched">
                <div class="text-body-1">一致するイベントがありません。</div>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'ConnpassEventListPage',
    components: {
    },
    data() {
        return {
            isSearched: false,
            errorMessage: "",
            datePickerDialog: false,
            dates: [],
            keyword: "",
            eventSearchWord: "",
            headers: [
                {
                    text: 'タイトル', value: 'title',
                },
                {
                    text: '場所', value: 'address',
                },
                {
                    text: '開始日時', value: 'started_at',
                },
                {
                    text: '終了日時', value: 'ended_at',
                },
                {
                    text: 'リンク', value: 'event_url',
                }],
        }
    },
    computed: {
        ...mapGetters({
            loadingFlg: 'view/getLoadingFlg',
            events: 'connpass/getEvents',
        }),
        dateRangeText() {
            return this.dates.map(d => this.$dateformat_YYYYMMDD(d)).join(' ~ ');
        },
        alert() {
            if (this.keyword.length === 0 && this.dates.length === 0) {
                return "開催日（期間）、または、キーワードを入力してください。"
            } else if (this.dates.length === 2 &&
                this.$getJpnDate_YYYYMMDD(this.dates[0]).getTime() > this.$getJpnDate_YYYYMMDD(this.dates[1]).getTime()) {
                return "開催日（期間）のfrom-toの関係が不正です。";
            }
            return "";
        }
    },
    watch: {
    },
    mounted() {
        this.clearEvents();
        this.updateLoadingFlg(false);
    },
    methods: {
        ...mapActions({
            updateLoadingFlg: 'view/updateLoadingFlg',
            clearEvents: 'connpass/clearEvents',
            getEventInfo: 'connpass/getEventInfo',
        }),
        search() {
            this.errorMessage = "";
            this.clearEvents();
            this.getEventInfo({ dates: this.dates, keyword: this.keyword }).catch(() => {
                this.errorMessage = "イベント情報取得中にエラーが発生しました。再度、検索ボタンを押してください。";
            }).finally(() => {
                this.isSearched = true;
            })
        },
        // 外部サイトを開く
        apiLink() {
            window.open("https://connpass.com/about/api/", '_blank');
        },
        // 外部サイトを開く
        detailLink(event) {
            window.open(event.event_url, '_blank');
        },
        openGoogleMap(event) {
            window.open("http://maps.google.co.jp/maps?q=" + event.lat + "," + event.lon, '_blank');
        },
    }
}
</script>

