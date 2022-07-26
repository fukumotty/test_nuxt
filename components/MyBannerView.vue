<template>
    <v-card outlined flat tile elevation="0" class="mx-auto my-0 ">
        <v-toolbar flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar v-if="imageUrl.length > 0" tile size="90" class="mb-3 ml-3">
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                    <template #activator="{ on, attrs }">
                        <v-img :src="imageUrl" v-bind="attrs" v-on="on"></v-img>
                    </template>
                    <template #default="dialog">
                        <v-card>
                            <v-img :src="imageUrl" v-bind="attrs" v-on="on"></v-img>
                            <v-card-actions class="justify-end">
                                <v-btn text @click="dialog.value = false">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </v-avatar>
            <div class="mx-3">
                <div v-if="description.length > 0" class="text-body-2">
                    {{ description }}
                </div>
                <div class="text-overline my-3">{{ date }}</div>
            </div>
            <v-card-actions>
                <v-btn v-if="btnText.length > 0" :color="btnColor" outlined class="mb-0" @click="btnClick">
                    {{ btnText }}
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'MyBannerView',
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
<style>
v-card-actions {
    position: absolute;
    bottom: 0;
}
</style>