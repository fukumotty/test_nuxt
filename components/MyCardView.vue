<template>
    <v-card class="mx-auto mb-6" max-width="344" outlined>
        <v-img v-if="imageUrl.length > 0" height="200" :src="imageUrl"></v-img>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <div class="my-4 text-subtitle-3">
                {{ description }}
            </div>
        </v-card-text>
        <v-card-text>
            <div class="text-right">{{ date }}</div>
        </v-card-text>
        <v-divider v-if="btnText.length > 0" class="mx-4"></v-divider>
        <v-card-actions>
            <v-btn v-if="btnText.length > 0" :color="btnColor" @click="btnClick">
                {{ btnText }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'MyCardView',
    props: {
        imageUrl: {
            type: String,
            required: false,
            default: null
        },
        title: {
            type: String,
            required: true,
            default: ""
        },
        description: {
            type: String,
            required: true,
            default: ""
        },
        date: {
            type: String,
            required: true,
            default: ""
        },
        btnText: {
            type: String,
            required: false,
            default: ""
        },
        btnColor: {
            type: String,
            required: false,
            default: "gray"
        },
    },
    methods: {
        btnClick() {
            this.$emit('onButtonClick');
        }
    }
}
</script>