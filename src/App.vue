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
    font-size: 15px;
  }
  .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
    background-color: rgba(124, 31, 244, 0.38) !important;
    height: 12px;
    border-radius: 20%; 
  }
  .v-application .v-stepper .primary {
    background-color: var(--purple-color) !important;
    border-color: var(--purple-color) !important;
    border-radius: 20%;
    height: 12px;
    color: var(--purple-color);
  }
  .v-application .container {
    font-family: 'Jost', sans-serif;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px 18px;
  }
  .container h1 {
    text-align: center;
    font-size: 1.7em;
  }
  h1 {
    font-weight: normal;
    color: var(--purple-color);
  }
  .container .v-input {
    font-size: 15px;
  }
  .container .v-btn {
    text-transform: lowercase;
    letter-spacing: 1px;
    font-family: 'Baloo 2', sans-serif;
    justify-self: flex-start;
  }
  .v-label {
    font-style: italic;
  }
  .v-btn {
    width: 93%;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 60px;
  }
</style>