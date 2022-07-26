<template>
    <v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if="loading.flg" :color="loading.color" :width="loading.width" :size="loading.size">
        </my-loading-progress>
        <!--  Error発生時 -->
        <my-error-view v-else-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <v-col v-if="!loading.flg && !error.flg && !listDisplayFlg" class="d-flex flex-wrap">
            <my-card-view v-for="item in items" :key="item.title" :title="item.title" :description="item.description"
                :date="item.date" :image-url="item.image" btn-text="詳細をみる" btn-color="blue darken-1"
                @onButtonClick="detailLink(item)">
            </my-card-view>
        </v-col>
        <v-col v-if="!loading.flg && !error.flg && listDisplayFlg">
            <my-banner-view v-for="item in items" :key="item.title" :title="item.title" :description="item.description"
                :date="item.date" :image-url="item.image" btn-text="詳細をみる" btn-color="blue darken-1"
                @onButtonClick="detailLink(item)">
            </my-banner-view>
        </v-col>
    </v-row>
</template>

<script>
import MyBannerView from '~/components/MyBannerView'
import MyCardView from '~/components/MyCardView'
import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'

const axiosObj = require('axios');
const parseString = require('xml2js').parseString;

export default {
    name: 'RssListPage',
    components: {
        MyBannerView,
        MyCardView,
        MyErrorView,
        MyLoadingProgress,
    },
    layout: 'tabs',
    validate({ params }) {
        return params.category !== undefined;
    },
    data() {
        return {
            listDisplayFlg: false,
            loading: {
                flg: true,
                size: 70,
                width: 7,
                color: "amber"
            },
            error: {
                flg: false,
                title: "エラー",
                message: null,
            },
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

            this.loading.flg = true;
            this.initError();

            axiosObj.get(rssInfo.targetUrl).then((response) => {
                parseString(response.data, (err, result) => {
                    this.parse(err, category, result);
                });
            }).catch((err) => {
                this.setError(err.errorMessage);
            }).finally(() => {
                this.loading.flg = false;
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
                this.setError('予期せぬエラーが発生しました。');
            }
        },
        // はてなブックマークを整形
        parseHatena(err, resultJson) {
            this.items.splice(0);
            if (err) {
                this.setError('予期せぬエラーが発生しました。');
            } else {
                const jsonItem = resultJson["rdf:RDF"].item;
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
                this.setError('予期せぬエラーが発生しました。');
            } else {
                const jsonItem = resultJson.rss.channel[0].item;
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
                this.setError('予期せぬエラーが発生しました。');
            } else {
                const jsonItem = resultJson.rss.channel[0].item;
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
        initError() {
            this.error.flg = false;
            this.error.message = null;
        },
        setError(message) {
            this.error.flg = true;
            this.error.message = message;
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

