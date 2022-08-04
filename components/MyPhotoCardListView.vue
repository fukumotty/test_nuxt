<template>
    <v-container>
        <v-row class="my-3">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="検索" single-line hide-details>
            </v-text-field>
        </v-row>
        <v-row v-if="filteredItems.length > 0" class="d-flex flex-wrap my-3">
            <v-card v-for="item in filteredItems" :key="item.title" class="mx-auto mb-6" max-width="200" outlined>
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                    <template #activator="{ on, attrs }">
                        <v-img :src="item.url" v-bind="attrs" v-on="on" class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                            <v-card-title v-text="item.id"></v-card-title>
                            <v-card-subtitle v-text="item.title"></v-card-subtitle>
                        </v-img>
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
            </v-card>
        </v-row>
        <v-row v-else>
            <div class="text-h4">表示するデータがありません。</div>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'MyPhotoCardListView',
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
        }
    },
    computed: {
        filteredItems() {
            if (this.items.length === 0 || this.search.length === 0) {
                return this.items;
            }
            return this.items.filter(item => String(item.id).includes(this.search) || (item.title.includes(this.search)));
        }
    }
}
</script>
<style scoped>
.v-text-field {
    max-width: 500px;
}
</style>
