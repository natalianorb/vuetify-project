<template>
  <v-container>
    <v-row>
      <v-col class="pa-0">
        <Categories
          :categories="categoriesStore.categories"
          :selected-category="categoriesStore.selectedCategory"
          @select="goToCategory"
        />
      </v-col>
    </v-row>

    <!-- Products Section -->
    <v-row>
      <v-col
        v-for="product in productsStore.products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <ProductCard
          :product="product"
          @open="goToProductPage"
        />
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
import ProductCard from "@/components/ProductCard.vue";
import router from "@/router";
import { useCategoriesStore } from "@/stores/categories";
import { useProductsStore } from "@/stores/products";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const route = useRoute();

watch(
  () => route.params,
  (params) => {
    const categoryId = "categoryId" in params ? params.categoryId : undefined;
    onCategoryChange(categoryId);
  },
);

onMounted(() => {
  const categoryId =
    "categoryId" in route.params ? route.params.categoryId : undefined;

  // todo move this to route guard
  if (
    !categoriesStore.selectedCategory ||
    categoriesStore.selectedCategory.slug !== categoryId
  ) {
    categoriesStore.fetchCategories();
  }

  onCategoryChange(categoryId);
});

async function onCategoryChange(newCategoryId?: string) {
  if (newCategoryId) {
    await productsStore.fetchProductsByCategory(newCategoryId);
  } else {
    await productsStore
      .fetchProducts()
      .then(() => categoriesStore.fetchCategories());
  }
}

function goToCategory(category: Category) {
  router.push("/category/" + category.slug);
}

function goToProductPage(product: Product) {
  router.push("/product/" + product.id);
}
</script>

<style scoped>
.v-card-title {
  font-size: 1.1rem;
  line-height: 1.2;
}
</style>
