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
    padding: 24px 18px;
  }
  .container h1 {
    text-align: center;
    font-size: 1.5em;
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
  .container .v-input {
    font-size: 15px;
  }
  .container .v-btn {
    text-transform: lowercase;
    letter-spacing: normal;
  }
</style>