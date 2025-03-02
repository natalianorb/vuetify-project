import type { Product } from '@/types/product'
import { defineStore } from 'pinia'

const productsLimit = 30

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const selectedProduct = ref<Product | null>(null)

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

  const fetchProductById = async (productId: string) => {
    loading.value = true
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`)
      const data = await response.json()

      selectedProduct.value = data
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    loading.value = false
  }

  const selectProduct = (product: Product | null) => {
    selectedProduct.value = product
  }

  return {
    products,
    loading,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductById,
    selectedProduct,
    selectProduct,
  }
})
