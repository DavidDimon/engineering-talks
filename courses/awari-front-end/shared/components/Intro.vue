<script setup lang="ts">
import { computed } from 'vue';

import { imageUrl } from '../images';

const props = defineProps<{ title: string; image?: string }>();
const coverImage = computed(() => imageUrl(props.image ?? 'introImage'));
</script>

<template>
  <section class="awari-intro">
    <img class="awari-intro__cover" :src="coverImage" alt="" />
    <div class="awari-intro__content">
      <img class="awari-intro__logo" :src="imageUrl('awari')" alt="Awari" />
      <h1>{{ title }}</h1>
      <div class="awari-intro__author">
        <img :src="imageUrl('me')" alt="David Dimon" />
        <span>David Dimon<br />2021–2022</span>
      </div>
    </div>
  </section>
</template>
