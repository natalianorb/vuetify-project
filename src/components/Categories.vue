<template>
  <v-slide-group
    show-arrows
  >
    <v-slide-group-item
      v-for="category in categories"
      :key="category.slug"
      v-slot="{ isSelected, toggle }"
      :value="category.slug"
      :active="selectedCategory === category"
    >
      <v-btn
        :color="isSelected ? 'primary' : undefined"
        class="ma-2"
        rounded
        @click="toggle(); isSelected && $emit('select', category)"
      >
        <img
          :src="category.thumbnail || 'https://via.placeholder.com/100'"
          :alt="category.name"
          class="category-thumbnail"
        >
        {{ category.name }}
      </v-btn>
    </v-slide-group-item>
  </v-slide-group>
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

<style scoped>
.category-thumbnail {
  width: 36px;
  height: 36px;
  margin-left: -10px;
  margin-right: 10px;
  mask-image:
  radial-gradient(circle at center, black 0%, black  49%,  transparent 50%, transparent);
}
</style>
