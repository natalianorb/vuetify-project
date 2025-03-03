<template>
  <v-app-bar
    flat
    density="compact"
  >
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-btn
        to="/"
        icon="$vuetify"
      />

      <v-app-bar-title class="pa-3">
        Vuetify Shop Project
      </v-app-bar-title>

      <v-spacer />
      <v-btn
        to="/cart"
        icon
      >
        <v-badge
          :content="cartStore.itemsCount"
          color="primary"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore()
</script>
