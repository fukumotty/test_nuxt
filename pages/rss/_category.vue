<template>
    <v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if='loadingFlg' :color="$const.loadingProgress.color"
            :width="$const.loadingProgress.width" :size="$const.loadingProgress.size">
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
            loadingFlg: true,
            error: {
                flg: false,
                title: "エラー",
                message: null,
            },
        }
    },
    computed: {
        items() {
            return this.$store.getters['rss/getRssResultData'](this.$route.params.category);
        },
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
            this.loadingFlg = true;
            this.initError();
            this.$store.dispatch('rss/getRssData', category).catch((err) => {
                this.setError(err.errorMessage);
            }).finally(() => {
                this.loadingFlg = false;
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
        detailLink(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

