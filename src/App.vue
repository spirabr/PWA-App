<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import { createIndexedDB } from './store';
export default {
  name: 'App',
  beforeCreate() {
    createIndexedDB();
  }
}
</script>

<style>
  :root {
    --purple-color: #7c31f4;
    --purple-box-shadow: rgba(124, 31, 244, 0.38);
    --grey-color: #707070;
    --grey-color-faded: #707070;
    font-size: 15px;
  }
  .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
    background-color: var(--purple-box-shadow) !important;
    height: 10.5px;
    width: 70px;
    border-radius: 43px;
    padding: 0; 
  }
  .v-application .v-stepper .primary {
    background-color: var(--purple-color) !important;
    border-color: var(--purple-color) !important;
    border-radius: 43px;
    height: 10.5px;
    width: 70px;
  }
  .v-application .container {
    font-family: 'Jost', sans-serif;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px 22px;
  }
  .container h1 {
    text-align: center;
    font-size: 1.7em;
  }
  i.v-icon.notranslate.mdi.mdi-check.theme--light {
    display: none;
  }
  .v-stepper__wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container .microphone {
    align-self: flex-start;
  }
  p {
    font-size: 1.1em;
  }
  h1 {
    font-weight: bold;
    color: var(--purple-color);
    font-family: 'Baloo 2', sans-serif;
  }
  .container .v-input {
    font-size: 15px;
  }
  .container .v-btn {
    text-transform: lowercase;
    letter-spacing: 0.8px;
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