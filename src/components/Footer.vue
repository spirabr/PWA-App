<template>
  <v-footer>
    <p> SPIRA </p>
    <p> 2021</p>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  .v-footer {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font: outline;
    white-space: pre-line;
    position: absolute;
    bottom: 0;
    height: 7%;
    width: 100%;
  }
  .theme--light.v-footer {
    background-color: white;
  }
</style>