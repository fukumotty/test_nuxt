<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h1">{{ title }}</div>
        <div class="text-subtitle-1">{{ message }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>RSS 記事一覧</v-card-title>
          <v-card-subtitle>RSSのXMLを取得、表示したページ。</v-card-subtitle>
          <v-card-text>
            <ol class="mx-y">
              <li>
                <router-link to="/rss/hatena-hot">はてな（人気）</router-link>
              </li>
              <li>
                <router-link to="/rss/yahoo-news-top">YahooNews（主要）</router-link>
              </li>
              <li>
                <router-link to="/rss/yahoo-news-domestic">YahooNews（国内）</router-link>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>JSON Place holder</v-card-title>
          <v-card-subtitle>JSON Place holderのAPIからデータを取得、表示したページ。</v-card-subtitle>
          <v-card-text>
            <ol class="mx-y">
              <li>
                <router-link to="/jsonplaceholder/posts">POSTS APIのデータを取得→表示したページ</router-link>
              </li>
              <li>
                <router-link to="/jsonplaceholder/todos">TODOS APIのデータを取得→表示したページ</router-link>
              </li>
              <li>
                <router-link to="/jsonplaceholder/albums">ALBUMS APIのデータを取得→表示したページ</router-link>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>駅情報表示</v-card-title>
          <v-card-subtitle>「HeartRails Express」のAPIのデータを取得→表示したページ。</v-card-subtitle>
          <v-card-text>
            <ol class="mx-y">
              <li>
                <router-link to="/expressheartrails">駅情報表示ページ</router-link>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      title: 'Hello',
      message: 'ページにリンクします。',
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>
