import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<{ product: Product; quantity: number }[]>([])

  const addToCart = (product: Product) => {
    const existingItem = cartItems.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ product, quantity: 1 })
    }
  }

  const decrementQuantity = (productId: number) => {
    const item = cartItems.value.find(item => item.product.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeFromCart(productId)
      }
    }
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId)
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const itemsCount = computed(() => {
    return cartItems.value.length
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })

  return {
    cartItems,
    addToCart,
    decrementQuantity,
    removeFromCart,
    totalItems,
    itemsCount,
    totalPrice
  }
})
