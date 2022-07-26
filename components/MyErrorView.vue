<template>
    <!-- ロードエラー時 -->
    <v-col align="center">
        <div class="display-1">{{ errorTitle }}</div>
        <p>{{ errorMessage }}</p>
        <v-btn rounded color="primary" dark @click="reload">
            再読込
        </v-btn>
    </v-col>
</template>

<script>
export default {
    name: 'MyErrorView',
    props: {
        errorTitle: {
            type: String,
            required: false,
            default: "エラー"
        },
        errorMessage: {
            type: String,
            required: false,
            default: "予期せぬエラーが発生しました"
        }
    },
    methods: {
        reload() {
            this.$emit('reload');
        }
    }
}
</script>
