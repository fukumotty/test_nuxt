<template>
    <v-row>
        <v-col v-if="loading" align="center">
            <!-- 読み込み時 -->
            <v-progress-circular v-if='loading' :size="70" :width="7" indeterminate color="amber"></v-progress-circular>
        </v-col>
        <v-col v-else-if='errorFlg' align="center">
            <!-- ロードエラー時 -->
            <div class="display-1">読み込みに失敗しました。</div>
            <p>{{ errorMessage }}</p>
            <div>
                <v-btn rounded color="primary" dark @click="load">
                    再読込
                </v-btn>
            </div>
        </v-col>
        <v-col v-else class="d-flex flex-wrap">
            <!-- データ取得時 -->
            <v-card v-for="item in items" :key="item.title" class="mx-auto mb-6" max-width="344" outlined>
                <v-img v-if="item.image.length > 0" height="200" :src="item.image"></v-img>
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-text>
                    <div class="my-4 text-subtitle-3">
                        {{ item.description }}
                    </div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <div class="text-right">{{ item.date }}</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="cyan lighten-2" @click="detailLink(item)">
                        詳細をみる
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
const axiosObj = require('axios');
const parseString = require('xml2js').parseString;

export default {
    name: 'RssListPage',
    layout: 'tabs',
    validate({ params }) {
        return params.category !== undefined;
    },
    data() {
        return {
            loading: true,
            errorFlg: false,
            errorMessage: null,
            items: [],
        }
    },
    computed: {
    },
    mounted() {
        this.load();
    },
    methods: {
        // データを取得する
        load() {
            const category = this.$route.params.category;
            const rssInfo = this.$store.getters['rss/getRssInfoFromCategory'](category);

            this.loading = true;
            this.errorFlg = false;
            this.errorMessage = null;

            axiosObj.get(rssInfo.targetUrl).then((response) => {
                parseString(response.data, (err, result) => {
                    this.parse(err, category, result);
                });
            }).catch((err) => {
                this.errorFlg = true;
                this.errorMessage = err.errorMessage;
            }).finally(() => {
                this.loading = false;
            });
        },
        // パース処理
        parse(err, category, resultJson) {
            if (category.includes('hatena')) {
                this.parseHatena(err, resultJson);
            } else if (category.includes('yahoo-news')) {
                this.parseYahooNews(err, resultJson);
            } else if (category.includes('it-media')) {
                this.parseITMedia(err, resultJson);
            } else {
                this.errorFlg = true;
                console.log('no parse pattern.');
            }
        },
        // はてなブックマークを整形
        parseHatena(err, resultJson) {
            this.items.splice(0);
            if (err) {
                this.errorFlg = true;
            } else {
                const jsonItem = resultJson["rdf:RDF"].item;
                this.errorFlg = false;
                for (const key in jsonItem) {
                    const item = jsonItem[key];
                    this.items.push({
                        title: item.title === undefined ? "" : item.title[0],
                        description: item.description === undefined ? "" : item.description[0],
                        link: item.link === undefined ? "" : item.link[0],
                        image: item.image === undefined ? "" : item.image[0],
                        date: item["dc:date"] === undefined ? "" : this.dateformat(item["dc:date"][0]),
                    });
                }
            }
        },
        // Yahooニュースを整形
        parseYahooNews(err, resultJson) {
            this.items.splice(0);
            if (err) {
                this.errorFlg = true;
            } else {
                const jsonItem = resultJson.rss.channel[0].item;
                this.errorFlg = false;
                for (const key in jsonItem) {
                    const item = jsonItem[key];
                    this.items.push({
                        title: item.title === undefined ? "" : item.title[0],
                        description: item.description === undefined ? "" : item.description[0],
                        link: item.link === undefined ? "" : item.link[0],
                        image: item.image === undefined ? "" : item.image[0],
                        date: item.pubDate === undefined ? "" : this.dateformat(item.pubDate[0]),
                    });
                }
            }
        },
        // ITMedia
        parseITMedia(err, resultJson) {
            this.items.splice(0);
            if (err) {
                this.errorFlg = true;
            } else {
                const jsonItem = resultJson.rss.channel[0].item;
                this.errorFlg = false;
                for (const key in jsonItem) {
                    const item = jsonItem[key];
                    this.items.push({
                        title: item.title === undefined ? "" : item.title[0],
                        description: item.description === undefined ? "" : item.description[0],
                        link: item.link === undefined ? "" : item.link[0],
                        image: item.image === undefined ? "" : item.image[0],
                        date: item.pubDate === undefined ? "" : this.dateformat(item.pubDate[0]),
                    });
                }
            }
        },
        // 日付フォーマット（yyyy/mm/dd hh:mm:ss）で日付の文字列を取得
        dateformat(dateString) {
            const date = new Date(dateString);
            return date.getFullYear().toString().padStart(2, '0') + "/"
                + (date.getMonth() + 1).toString().padStart(2, '0') + "/"
                + date.getDay().toString().padStart(2, '0') + " "
                + date.getHours().toString().padStart(2, '0') + ":"
                + date.getMinutes().toString().padStart(2, '0') + ":"
                + date.getSeconds().toString().padStart(2, '0');
        },
        // 外部サイトを開く
        detailLink(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

