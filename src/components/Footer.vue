<template>
  <v-footer>
    <p> SPIRA </p>
    <p> 2021  </p>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  .v-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 0;
    height: 9%;
    width: 100%;
  }
  .theme--light.v-footer {
    background-color: white;
  }
  .v-footer p {
    font-size: 0.8rem;
    margin: 0;
  }
</style>