<template>
  <v-row>
    <v-col>
      <div class="text-h1">{{ title }}</div>
      <div class="text-subtitle-1">{{ message }}</div>

      <v-divider class="my-4"></v-divider>
      <ol class="mx-y">
        <li>
          <router-link to="/rss/hatena-hot">はてな（人気）</router-link>
        </li>
        <li>
          <router-link to="/rss/hatena-new">はてな（新着）</router-link>
        </li>
        <li>
          <router-link to="/rss/yahoo-news-top">YahooNews（主要）</router-link>
        </li>
        <li>
          <router-link to="/rss/yahoo-news-domestic">YahooNews（国内）</router-link>
        </li>
        <li>
          <router-link to="/rss/yahoo-news-world">YahooNews（国際）</router-link>
        </li>
      </ol>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      title: 'Hello',
      message: '記事一覧へリンクします。',
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>
