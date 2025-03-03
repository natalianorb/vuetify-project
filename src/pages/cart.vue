<template>
  <v-container>
    <h1 class="text-h4 mb-6">
      Shopping Cart
    </h1>

    <div
      v-if="cartStore.cartItems.length === 0"
      class="text-center py-8"
    >
      <v-icon
        icon="mdi-cart-off"
        size="64"
        class="mb-4"
      />
      <h2 class="text-h5">
        Your cart is empty
      </h2>
      <v-btn
        color="primary"
        class="mt-4"
        :to="{ name: '/' }"
      >
        Continue Shopping
      </v-btn>
    </div>

    <template v-else>
      <v-table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cartStore.cartItems"
            :key="item.product.id"
          >
            <td class="text-no-wrap">
              <div class="d-flex align-center">
                <v-img
                  :src="item.product.thumbnail"
                  max-height="80"
                  width="80"
                  class="flex-0-1 me-4"
                />
                <div class="flex-1-0">
                  {{ item.product.title }}
                </div>
              </div>
            </td>
            <td>${{ item.product.price }}</td>
            <td>
              <v-btn-group>
                <v-btn
                  size="small"
                  icon="mdi-minus"
                  @click="cartStore.decrementQuantity(item.product.id)"
                />
                <v-btn
                  variant="text"
                  size="small"
                >
                  {{ item.quantity }}
                </v-btn>
                <v-btn
                  size="small"
                  icon="mdi-plus"
                  @click="cartStore.addToCart(item.product)"
                />
              </v-btn-group>
            </td>
            <td>${{ item.product.price * item.quantity }}</td>
            <td>
              <v-btn
                color="error"
                icon="mdi-delete"
                variant="text"
                @click="cartStore.removeFromCart(item.product.id)"
              />
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-divider class="my-6" />

      <div class="d-flex justify-space-between align-center">
        <v-btn
          color="primary"
          variant="text"
          :to="{ name: '/' }"
          prepend-icon="mdi-arrow-left"
        >
          Continue Shopping
        </v-btn>
        <div class="text-right">
          <div class="text-h6 mb-2">
            Total Items: {{ cartStore.totalItems }}
          </div>
          <div class="text-h4">
            Total: ${{ cartStore.totalPrice }}
          </div>
          <v-btn
            color="primary"
            size="large"
            class="mt-4"
          >
            Checkout
          </v-btn>
        </div>
      </div>
    </template>
  </v-container>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>
