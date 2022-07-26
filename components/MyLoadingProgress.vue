<template>
    <v-col align="center">
        <!-- 読み込み時 -->
        <v-progress-circular :size="size" :width="width" indeterminate :color="color"></v-progress-circular>
    </v-col>
</template>

<script>
export default {
    name: 'MyLoadingProgress',
    props: {
        size: {
            type: Number,
            required: false,
            default: 50
        },
        width: {
            type: Number,
            required: false,
            default: 5
        },
        color: {
            type: String,
            required: false,
            default: "grey"
        }
    },
}
</script>