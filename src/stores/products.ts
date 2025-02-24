import type { Product } from '@/types/product'
import { defineStore } from 'pinia'


const productsLimit = 30

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${productsLimit}`)
      const data = await response.json()
      products.value = data.products
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    loading.value = false
  }

  const fetchProductsByCategory = async (categorySlug: string) => {
    loading.value = true
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${categorySlug}?limit=${productsLimit}`)
      const data = await response.json()
      products.value = data.products
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    loading.value = false
  }

  return {
    products,
    loading,
    fetchProducts,
    fetchProductsByCategory,
  }
})
