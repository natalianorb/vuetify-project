<template>
  <v-card
    height="100%"
    @click="$emit('open', product)"
  >
    <v-img
      :src="product.thumbnail"
      height="200"
      cover
      class="bg-grey-lighten-2"
    />
    <v-card-title class="text-truncate">
      {{ product.title }}
    </v-card-title>
    <v-card-text>
      <div class="text-truncate mb-2">
        {{ product.description }}
      </div>
      <div class="text-h6 text-primary">
        ${{ product.price }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        variant="tonal"
      >
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()

defineEmits<{
  open: [product: Product]
}>()
</script>

<style scoped>
.v-card-title {
  font-size: 1.1rem;
  line-height: 1.2;
}
</style>
