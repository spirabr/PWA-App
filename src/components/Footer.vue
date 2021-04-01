<template>
  <v-footer>
    <strong>Spira - 2021</strong>
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

    position: absolute;
    bottom: 0;
    height: 7%;
    width: 100%;
  }
  .theme--light.v-footer {
    color: white;
    background-color: var(--purple-color);
  }
</style>