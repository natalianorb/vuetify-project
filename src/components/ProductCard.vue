<template>
  <v-card
    height="100%"
    :ripple="!isNavigationDisabled"
    :class="{ 'product-card--disabled-nav': isNavigationDisabled}"
    @click="goToProductPage"
  >
    <v-img
      :src="getImageSrc()"
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
        @click.stop="addItemToCart"
      >
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import router from "@/router"
import { useCartStore } from "@/stores/cart"
import { useProductsStore } from "@/stores/products"
import type { Product } from '@/types/product'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const props = withDefaults(defineProps<{
  product: Product,
  showThumbnail?: boolean,
  isNavigationDisabled?: boolean,
}>(), {
  showThumbnail: true,
  isNavigationDisabled: false,
});


function addItemToCart() {
  cartStore.addToCart(props.product)
}

function goToProductPage() {
  productsStore.selectProduct(props.product)
  router.push({ name: '/product.[productId]', params: { productId: props.product.id } })
}

function getImageSrc() {
  const thumbnail = props.product.thumbnail;
  if (props.showThumbnail) {
    return thumbnail;
  }
  const images = props.product.images;
  return images && images.length > 0 ? images[0] : thumbnail;
}
</script>

<style scoped>
.product-card--disabled-nav:hover {
  cursor: initial;
}

.v-card-title {
  font-size: 1.1rem;
  line-height: 1.2;
}
</style>
