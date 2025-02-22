// Utilities
import { createPinia } from 'pinia'
import { useCategoriesStore } from './categories'
import { useProductsStore } from './products'

export const pinia = createPinia()

export type { Category } from './categories'
export type { Product } from './products'
export default { useCategoriesStore, useProductsStore }

