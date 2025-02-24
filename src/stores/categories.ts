import type { Category } from '@/types/category'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useProductsStore } from './products'


export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const selectedCategory = ref<Category | null>(null)
  const productsStore = useProductsStore()

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories')
      const data = await response.json()
      if (Array.isArray(data)) {
        categories.value = data.map(category => ({
          ...category,
          thumbnail: productsStore.products.find(p => p.category === category.slug)?.thumbnail
        }))
      } else {
        console.error('Unexpected categories format:', data)
        categories.value = []
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      categories.value = []
    }
  }

  const selectCategory = (category: Category | null) => {
    selectedCategory.value = category
  }

  return {
    categories: computed(() => categories.value),
    selectedCategory,
    fetchCategories,
    selectCategory,
  }
})
