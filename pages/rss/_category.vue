<template>
    <v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if="loading.flg" :color="loading.color" :width="loading.width" :size="loading.size">
        </my-loading-progress>
        <!--  Error発生時 -->
        <my-error-view v-else-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <v-row v-else-if="items.length > 0">
            <v-col cols="12">
                <v-switch v-model="listDisplayFlg" :label="labelListDisplaySwitch">
                </v-switch>
            </v-col>
            <v-col v-if="listDisplayFlg">
                <my-banner-view v-for="item in items" :key="item.title" :title="item.title"
                    :description="item.description" :date="item.date" :image-url="item.image" btn-text="詳細をみる"
                    btn-color="blue darken-1" @onButtonClick="detailLink(item)">
                </my-banner-view>
            </v-col>
            <v-col v-else class="d-flex flex-wrap">
                <my-card-view v-for="item in items" :key="item.title" :title="item.title"
                    :description="item.description" :date="item.date" :image-url="item.image" btn-text="詳細をみる"
                    btn-color="blue darken-1" @onButtonClick="detailLink(item)">
                </my-card-view>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <div class="text-h3 mt-3">表示する内容がありません。</div>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
import MyBannerView from '~/components/MyBannerView'
import MyCardView from '~/components/MyCardView'
import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'

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
        listDisplayFlg: {
            get() {
                return this.$store.getters['rss/getListDisplayFlg']();
            },
            set(value) {
                this.$store.commit('rss/setListDisplayFlg', value);
            }
        },
        labelListDisplaySwitch() {
            return this.listDisplayFlg ? "グリッド表示に切替" : "リスト表示に切替"
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        // データを取得する
        load() {
            const category = this.$route.params.category;
            const rssInfo = this.$getRssInfoFromCategory(category);

            this.loading.flg = true;
            this.initError();

            this.$axios.get(rssInfo.targetUrl).then((response) => {
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
                        date: item["dc:date"] === undefined ? "" : this.$dateformat_YYYYMMDD_HHmmsss(item["dc:date"][0]),
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
                        date: item.pubDate === undefined ? "" : this.$dateformat_YYYYMMDD_HHmmsss(item.pubDate[0]),
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
                        date: item.pubDate === undefined ? "" : this.$dateformat_YYYYMMDD_HHmmsss(item.pubDate[0]),
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
        // 外部サイトを開く
        detailLink(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

