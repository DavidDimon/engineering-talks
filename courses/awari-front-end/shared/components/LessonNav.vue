<script setup lang="ts">
defineProps<{
  courseUrl: string;
  previousUrl?: string;
  nextUrl?: string;
}>();
</script>

<template>
  <nav class="lesson-nav" aria-label="Navegação da aula">
    <a v-if="previousUrl" :href="previousUrl">← Aula anterior</a>
    <a :href="courseUrl">Índice do curso</a>
    <a v-if="nextUrl" :href="nextUrl">Próxima aula →</a>
  </nav>
</template>
