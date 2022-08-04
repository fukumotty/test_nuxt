<template>
    <v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if='loadingFlg' :color="$const.loadingProgress.color"
            :width="$const.loadingProgress.width" :size="$const.loadingProgress.size">
        </my-loading-progress>
        <!--  Error発生時 -->
        <my-error-view v-else-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <v-container v-else-if="items.length > 0">
            <v-row class="my-3">
                <v-btn outlined color="primary" @click="detailLink()">API
                </v-btn>
            </v-row>
            <v-row class="my-3">
                <v-card>
                    <v-card-title>
                        Data
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="検索" single-line hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="items" :search="search" no-data-text="表示するデータがありません。"
                        no-results-text="一致するデータがありません。">
                        <template v-slot:[`item.userId`]="{ item }">
                            <nuxt-link :to="'/jsonplaceholder/user/' + item.userId">
                                {{ item.userId }}
                            </nuxt-link>
                        </template>
                    </v-data-table>
                </v-card>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row>
                <div class="text-h3 mt-3">表示するデータがありません。</div>
            </v-row>
        </v-container>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'

export default {
    name: 'JsonPlaceholderPostsPage',
    components: {
        MyErrorView,
        MyLoadingProgress,
    },
    data() {
        return {
            search: '',
            headers: [
                {
                    text: 'id', value: 'id',
                },
                {
                    text: 'userId', value: 'userId',
                },
                {
                    text: 'title', value: 'title',
                },
                {
                    text: 'body', value: 'body',
                },
            ],
            error: {
                flg: false,
                title: "エラー",
                message: null,
            },
        }
    },
    computed: {
        ...mapGetters({
            items: "jsonplaceholder/getPostItems",
            loadingFlg: "view/getLoadingFlg",
        }),
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            getPosts: "jsonplaceholder/getPosts",
        }),
        // データを取得する
        load() {
            this.initError();
            this.getPosts().catch((err) => {
                this.setError(err === undefined ? "" : err.errorMessage);
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
            window.open('https://jsonplaceholder.typicode.com/posts', '_blank');
        }
    }
}
</script>
