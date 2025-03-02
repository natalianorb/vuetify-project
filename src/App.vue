<template>
  <v-app>
    <v-app-bar
      flat
      density="compact"
      scroll-behavior="collapse"
    >
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-btn
          to="/"
          icon="$vuetify"
        />

        <v-app-bar-title class="pa-3">
          Vuetify Shop Project
        </v-app-bar-title>
      </v-container>
    </v-app-bar>

    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
