<template>
  <v-app dark>
    <!-- ■Header -->
    <v-app-bar color="primary" fixed app dark>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <!-- ■Main -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- ■footer -->
    <v-footer color="primary" app dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'MyPage',
    }
  },
  methods: {

  }
}
</script>
