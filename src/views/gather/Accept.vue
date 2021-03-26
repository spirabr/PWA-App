<template>
  <v-container>
    <div class="progress-bar">
      <div class="steps">
        <strong>Etapa 1</strong>
        <strong>Etapa 2</strong>
        <strong>Etapa 3</strong>
        <strong>Etapa 4</strong>
        <strong>Etapa 5</strong>
      </div>
      <v-progress-linear value="20"></v-progress-linear>
    </div>
    <h1>Titulo</h1>
    <h2>Caso sim, diga "Aceito"</h2>
    <Microphone/>
  </v-container>
</template>

<script>
import Microphone from '@/components/Microphone'

export default {
  name: 'Gather',
  components: { Microphone }
}
</script>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  .v-timeline {
    display: flex;
    flex-direction: column;
  }
  .progress-bar {
    width: 100%;
  }
  .steps {
    width: 100%;
    display: flex;
    align-items: space-between;
  }
</style>