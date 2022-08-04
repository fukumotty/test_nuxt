<template>
    <v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if='loadingFlg' :color="$const.loadingProgress.color"
            :width="$const.loadingProgress.width" :size="$const.loadingProgress.size">
        </my-loading-progress>
        <!--  Error発生時 -->
        <my-error-view v-else-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <v-container v-else>
            <v-row class="my-3">
                <v-btn outlined color="primary" @click="detailLink()">API
                </v-btn>
            </v-row>
            <v-row>
                <v-card>
                    <v-card-title>ユーザ情報</v-card-title>
                    <v-simple-table dense>
                        <tbody>
                            <tr v-for="item in items" :key="item.key">
                                <td :class="{ header: item.headerFlg }">{{ item.key }}</td>
                                <td :class="{ header: item.headerFlg }">{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card>
            </v-row>
        </v-container>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'

export default {
    name: 'JsonPlaceholderUserPage',
    components: {
        MyErrorView,
        MyLoadingProgress,
    },
    layout: 'default',
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
            items: "jsonplaceholder/getUserInfos",
            loadingFlg: "view/getLoadingFlg",
        }),
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            getUser: "jsonplaceholder/getUser",
        }),
        // データを取得する
        load() {
            this.initError();
            this.getUser(this.$route.params.userId).catch((err) => {
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
            window.open('https://jsonplaceholder.typicode.com/users/' + this.$route.params.userId, '_blank');
        }
    }
}
</script>

<style>
td.header {
    background-color: var(--v-accent-base);
}
</style>
