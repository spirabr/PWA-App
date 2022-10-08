<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
};
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;

    padding: 30px 22px;
  }
  .logo {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .route-button {
    margin-top: 16px;
    margin-bottom: 0px;
  }
  .buttons {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .v-size--large {
    font-weight: bold;
    font-size: 18.5px;

    color: white;
  }
  .v-btn--block {
    flex: unset;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    height: 47px;
  }
  video {
    height: 100%;
    width: 100%;
    max-height: 215px;
    max-width: 255px;
  }
</style>