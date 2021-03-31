<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
  .placeholder {
    text-align: inherit;
  }
  .placeholder .label {
    font-size: 0.8rem;
    color: red;
    margin: 0;
  }
</style>