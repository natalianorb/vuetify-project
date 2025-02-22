import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Category } from './categories'
import type { Product } from './products'

export const useStoreData = defineStore('storeData', () => {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const selectedCategory = ref<string | null>(null)

  const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value
    return products.value.filter(product => product.category === selectedCategory.value)
  })

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100')
      const data = await response.json()
      products.value = data.products
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    loading.value = false
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories')
      const data = await response.json()
      if (Array.isArray(data)) {
        categories.value = data
      } else {
        console.error('Unexpected categories format:', data)
        categories.value = []
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      categories.value = []
    }
  }

  const filterByCategory = (categorySlug: string | null) => {
    selectedCategory.value = categorySlug
  }

  // Add a method to get unique categories from products as fallback

  return {
    products: filteredProducts,
    categories: computed(() => categories.value),
    loading,
    fetchProducts,
    fetchCategories,
    filterByCategory,
    selectedCategory
  }
})
