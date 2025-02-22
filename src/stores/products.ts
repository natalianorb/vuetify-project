import { defineStore } from 'pinia'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)

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

  return {
    products,
    loading,
    fetchProducts,
  }
})
