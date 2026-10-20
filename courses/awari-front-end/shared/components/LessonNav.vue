<script setup lang="ts">
defineProps<{
  courseUrl: string;
  previousUrl?: string;
  nextUrl?: string;
}>();

const portuguese = import.meta.env.BASE_URL.includes('/pt-BR/');

function localizedUrl(url: string): string {
  if (!portuguese) return url;
  if (url.endsWith('/courses/awari-front-end/')) return `${url}?lang=pt-BR`;
  return `${url}pt-BR/`;
}
</script>

<template>
  <nav class="lesson-nav" :aria-label="portuguese ? 'Navegação da aula' : 'Lesson navigation'">
    <a v-if="previousUrl" :href="localizedUrl(previousUrl)">
      {{ portuguese ? '← Aula anterior' : '← Previous lesson' }}
    </a>
    <a :href="localizedUrl(courseUrl)">{{ portuguese ? 'Índice do curso' : 'Course index' }}</a>
    <a v-if="nextUrl" :href="localizedUrl(nextUrl)">
      {{ portuguese ? 'Próxima aula →' : 'Next lesson →' }}
    </a>
  </nav>
</template>
