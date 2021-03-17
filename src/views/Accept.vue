<template>
  <v-container>
    <div class="progress-bar">
      <div class="steps">
        <strong>Ficha técnica</strong>
        <strong>Aceite</strong>
        <strong>Vogal Sustentada</strong>
        <strong>Parlenda</strong>
        <strong>Texto Escrito</strong>
      </div>
      <v-progress-linear value="20"></v-progress-linear>
    </div>
    <h1>Você aceita fazer parte da coleta?</h1>
    <h2>Caso sim, diga "Aceito"</h2>
    <Microphone/>
  </v-container>
</template>

<script>
import Microphone from '@/components/Microphone'

export default {
  name: 'Accept',
  components: { Microphone }
}
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  .v-timeline {
    display: flex;
    flex-direction: column;
  }
  .steps {
    display: flex;
  }
  .steps strong {
    display: flex;
    place-items: center;
  }
</style>