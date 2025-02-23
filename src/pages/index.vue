<template>
  <v-container>
    <v-row>
      <CategoriesSidebar
        :categories="categoriesStore.categories"
        :selected-category="categoriesStore.selectedCategory"
        @select="categoriesStore.filterByCategory"
      />

      <!-- Products Section -->
      <v-col
        cols="12"
        md="9"
      >
        <v-row>
          <v-col
            v-for="product in productsStore.products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>

        <v-row
          v-if="!productsStore.products.length && !productsStore.loading"
          justify="center"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <v-alert type="info">
              No products found
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

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
import CategoriesSidebar from '@/components/Categories.vue'
import ProductCard from '@/components/ProductCard.vue'
import {useCategoriesStore} from '@/stores/categories'
import {useProductsStore} from '@/stores/products'
import {onMounted} from 'vue'

const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()


onMounted(async () => {
  await productsStore.fetchProducts()
    .then(() => categoriesStore.fetchCategories())
})
</script>

<style scoped>
.v-card-title {
  font-size: 1.1rem;
  line-height: 1.2;
}
</style>
