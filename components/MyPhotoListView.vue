<template>
    <v-row class="my-3">
        <v-card>
            <v-card-title>
                Photos LIST
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="検索" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="items" :search="search" no-data-text="表示するデータがありません。"
                no-results-text="表示するデータがありません。">
                <template v-slot:[`item.thumbnailUrl`]="{ item }">
                    <v-dialog transition="dialog-bottom-transition" max-width="600">
                        <template #activator="{ on, attrs }">
                            <v-img :src="item.thumbnailUrl" v-bind="attrs" v-on="on"></v-img>
                        </template>
                        <template #default="dialog">
                            <v-card>
                                <v-card-title v-text="item.title"></v-card-title>
                                <v-img :src="item.url"></v-img>
                                <v-card-actions class="justify-end">
                                    <v-btn text @click="dialog.value = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </template>
            </v-data-table>
        </v-card>
    </v-row>
</template>

<script>
export default {
    name: 'MyPhotoListView',
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        },
    },
    data() {
        return {
            search: '',
            headers: [
                {
                    text: 'image', value: 'thumbnailUrl',
                },
                {
                    text: 'id', value: 'id',
                },
                {
                    text: 'title', value: 'title',
                }
            ],
        }
    },
}
</script>
