<template>
  <v-card>
    <v-card-title>Categories</v-card-title>
    <v-list>
      <v-list-item
        v-for="category in categories"
        :key="category.slug"
        :value="category.slug"
        :active="selectedCategory === category"
        @click="$emit('select', category)"
      >
        <v-list-item-title>
          {{  category.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import type {Category} from '@/stores';

defineProps<{
  categories: Category[]
  selectedCategory: Category | null
}>()

defineEmits<{
  select: [category: Category]
}>()

</script>
