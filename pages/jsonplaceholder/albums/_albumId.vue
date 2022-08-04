<template>
    <v-row>
        <!-- 読み込み時 -->
        <my-loading-progress v-if='loadingFlg' :color="$const.loadingProgress.color"
            :width="$const.loadingProgress.width" :size="$const.loadingProgress.size">
        </my-loading-progress>
        <!--  Error発生時 -->
        <my-error-view v-else-if='error.flg' :error-title="error.title" :error-message="error.message" @reload="load">
        </my-error-view>
        <v-container v-else-if="item.album !== undefined">
            <v-row class="my-3">
                <v-btn outlined color="primary" @click="detailAlbumLink()">album API</v-btn>
                <v-btn outlined color="primary" @click="detailPhotosLink()">Photo API</v-btn>
            </v-row>
            <div class="text-h3">{{ item.album.title }}</div>
            <v-row>
                <v-switch v-model="listDisplayFlg" :label="labelListDisplaySwitch">
                </v-switch>
            </v-row>
            <my-photo-list-view v-if="listDisplayFlg" :items="item.photos"></my-photo-list-view>
            <my-photo-card-list-view v-else :items="item.photos"></my-photo-card-list-view>
        </v-container>
        <v-container v-else>
            <v-row>
                <div class="text-h4 mt-3">表示するデータがありません。</div>
            </v-row>
        </v-container>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyErrorView from '~/components/MyErrorView'
import MyLoadingProgress from '~/components/MyLoadingProgress'
import MyPhotoListView from '~/components/MyPhotoListView'
import MyPhotoCardListView from '~/components/MyPhotoCardListView'

export default {
    name: 'JsonPlaceholderTodosPage',
    components: {
        MyErrorView,
        MyLoadingProgress,
        MyPhotoListView,
        MyPhotoCardListView,
    },
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
            loadingFlg: "view/getLoadingFlg",
            item: "jsonplaceholder/getPhotoItem",
            getListDisplayFlg: "jsonplaceholder/getListDisplayFlg"
        }),
        listDisplayFlg: {
            get() {
                return this.getListDisplayFlg;
            },
            set(value) {
                this.updateListDisplayFlg(value);
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
        ...mapActions({
            getPhotos: "jsonplaceholder/getPhotos",
            updateListDisplayFlg: "jsonplaceholder/updateListDisplayFlg",
        }),
        // データを取得する
        load() {
            this.initError();
            this.getPhotos(this.$route.params.albumId).catch((err) => {
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
        detailAlbumLink() {
            window.open('https://jsonplaceholder.typicode.com/albums/' + this.$route.params.albumId, '_blank');
        },
        // 外部サイトを開く
        detailPhotosLink() {
            window.open('https://jsonplaceholder.typicode.com/photos?albumId=' + this.$route.params.albumId, '_blank');
        }
    }
}
</script>
