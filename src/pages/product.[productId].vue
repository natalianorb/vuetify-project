<template>
  <v-container>
    <ProductCard
      v-if="productsStore.selectedProduct"
      :product="productsStore.selectedProduct!"
      :show-thumbnail="false"
      :is-navigation-disabled="true"
    />
    <!-- Loading Overlay -->
    <v-overlay
      :model-value="productsStore.loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-container>
</template>

<script lang="ts" setup>
import { useProductsStore } from '@/stores/products';
import { useRoute } from 'vue-router';

const route = useRoute();
const productsStore = useProductsStore();


onMounted(async () => {
  const { selectedProduct } = productsStore;

  if (!selectedProduct) {
    await productsStore.fetchProductById(route.params.productId as string);
  }
});
</script>

<style scoped>
</style>

