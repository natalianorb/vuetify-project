// Utilities
import { createPinia } from 'pinia'
import { useCategoriesStore } from './categories'
import { useProductsStore } from './products'

export const pinia = createPinia()

export default { useCategoriesStore, useProductsStore }

