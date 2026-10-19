<script setup lang="ts">
import { imageUrl } from '../images';

defineProps<{ name: string; alt?: string; width?: number; height?: number }>();
</script>

<template>
  <img
    class="awari-slide__image"
    :src="imageUrl(name)"
    :alt="alt ?? ''"
    :style="{
      maxWidth: width ? `${width}px` : undefined,
      maxHeight: height ? `${height}px` : undefined,
    }"
  />
</template>
