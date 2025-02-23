import ProductsByCategoryPage from '@/pages/ProductsByCategoryPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ProductsByCategoryPage,
    children: [
      {
        path: 'category/:categoryId',
        component: ProductsByCategoryPage,
        props: true,
        children: [
          {
            path: 'subcategory/:subcategoryId',
            component: ProductsByCategoryPage,
            props: true,
          },
        ]
      },
    ],
  },
  // Add more routes here...
]
