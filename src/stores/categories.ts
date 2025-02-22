import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Category {
  slug: string
  name: string
  url: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const selectedCategory = ref<string | null>(null)

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

  return {
    categories: computed(() => categories.value),
    selectedCategory,
    fetchCategories,
    filterByCategory,
  }
})
