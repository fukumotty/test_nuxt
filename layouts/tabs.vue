<template>
  <v-app dark>
    <v-app-bar color="cyan" fixed app dark>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <template #extension>
        <v-tabs v-model="tabIndex" align-with-title @change="onTabChange">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in $store.state.rss.rssInfo" :key="item.name">
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- ■Main -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- ■footer -->
    <v-footer color="cyan" app dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'TabsLayout',
  data() {
    return {
      preTabIndex: null,
      tabIndex: null,
      tabItems: ['aa', 'bbb', 'ccc'],
      title: 'MyPage',
    }
  },
  created() {
    // 画面が作成された時
    const category = this.$route.params.category;
    const targetIndex = this.$store.getters['rss/getRssInfoIndexFromCategory'](category);
    if (targetIndex !== -1) {
      this.tabIndex = targetIndex;
    }
  },
  mounted() {
  },
  methods: {
    // タブが切り替わった時
    onTabChange() {
      if (this.preTabIndex !== this.tabIndex) {
        this.preTabIndex = this.tabIndex;
        const rssInfo = this.$store.getters['rss/getRssInfoFromIndex'](this.tabIndex);
        this.$router.push('/rss/' + rssInfo.category);
      }
    },
  }
}
</script>
