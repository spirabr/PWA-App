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
  :root {
    --purple-color: #7c31f4;
    font-size: 13px;
  }
  .v-application .container {
    font-family: 'Barlow Condensed', sans-serif;
    font-family: 'Lexend', sans-serif;
    font-family: 'PT Sans', sans-serif;
    font-family: 'Rajdhani', sans-serif;
    font-family: 'Titillium Web', sans-serif;
    font-family: 'Ubuntu', sans-serif;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;
    padding-top: 18px;
  }
  h1 {
    font-weight: normal;
    color: var(--purple-color);
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