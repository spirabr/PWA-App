<template>
  <v-container>
    <back-home-button/>

    <h1>sobre o spira</h1>

    <main>
      <p>Texto descritivo sobre o projeto SPIRA</p>
    </main>

  </v-container>
</template>

<script>
import BackHomeButton from '@/components/BackHomeButton.vue';
export default {
  components: { BackHomeButton },
  name: 'About',
};
</script>

<style scoped>
  .container {
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
  }
  h1 {
    margin: 0 0 35px 0;
  }
  .container main {
    width: 100%;
    height: 100%;

    display: flex;
    place-items: center top;
  }
  p {
    text-align: left;
    font-weight: normal;
    color: #707070;
    padding-bottom: 3%;
  }
  .container main {
    width: 100%;
  }
  header {
    margin: 7.5% 0;
  }
</style>