<template>
  <v-container>
    <!-- Mobile Categories Button -->
    <v-row class="d-md-none mb-4">
      <v-col>
        <v-btn
          block
          color="primary"
          @click="showMobileCategories = true"
        >
          Show Categories
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- Categories Section - Hidden on mobile -->
      <v-col cols="12" md="3" class="d-none d-md-block">
        <CategoriesSidebar
          :categories="store.categories"
          :selected-category="store.selectedCategory"
          @select="store.filterByCategory"
        />
      </v-col>

      <!-- Products Section -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="product in store.products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>

        <v-row v-if="!store.products.length && !store.loading" justify="center">
          <v-col cols="12" class="text-center">
            <v-alert type="info">
              No products found
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Mobile Categories Drawer -->
    <v-navigation-drawer
      v-model="showMobileCategories"
      location="left"
      temporary
    >
      <v-toolbar color="primary">
        <v-toolbar-title class="text-white">Categories</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          @click="showMobileCategories = false"
        ></v-btn>
      </v-toolbar>
      <CategoriesSidebar
        :categories="store.categories"
        :selected-category="store.selectedCategory"
        @select="handleMobileSelect"
      />
    </v-navigation-drawer>

    <!-- Loading Overlay -->
    <v-overlay
      :model-value="store.loading"
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
import CategoriesSidebar from '@/components/CategoriesSidebar.vue'
import ProductCard from '@/components/ProductCard.vue'
import {useStoreData} from '@/stores/store'
import {onMounted,ref} from 'vue'

const store = useStoreData()
const showMobileCategories = ref(false)

const handleMobileSelect = (category: string) => {
  store.filterByCategory(category)
  showMobileCategories.value = false
}

onMounted(async () => {
  await Promise.all([
    store.fetchProducts(),
    store.fetchCategories()
  ])
})
</script>

<style scoped>
.v-card-title {
  font-size: 1.1rem;
  line-height: 1.2;
}
</style>
