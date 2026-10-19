<script setup lang="ts">
import { computed } from 'vue';

import { imageUrl } from '../images';

const props = defineProps<{
  title?: string;
  image?: string;
  imageOptions?: { width?: number; height?: number };
  marginTitle?: string;
}>();
const illustration = computed(() => (props.image ? imageUrl(props.image) : undefined));
const imageStyle = computed(() => ({
  maxWidth: props.imageOptions?.width ? `${props.imageOptions.width}px` : undefined,
  maxHeight: props.imageOptions?.height ? `${props.imageOptions.height}px` : undefined,
}));
</script>

<template>
  <section class="awari-slide">
    <h1 v-if="title" :style="{ marginBottom: marginTitle }">{{ title }}</h1>
    <img
      v-if="illustration"
      class="awari-slide__image"
      :src="illustration"
      :alt="title"
      :style="imageStyle"
    />
    <div v-if="$slots.default" class="awari-slide__content"><slot /></div>
  </section>
</template>
