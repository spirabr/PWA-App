<template>
  <v-container>
    <h1>obrigado por participar</h1>
    <router-link to="/">
      <v-btn
        outlined
        rounded
        block
        color="#500486"
        class="back-home"
      >
        voltar para o início
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }
  .container h1 {
    height: 45%;
  }
  .back-home {
    color: white;
  }
  .container a {
    position: absolute;
    bottom: 2rem;
    height: 60px;
    width: 93%;
    text-decoration: none;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 60px;
    font-size: 1.3rem;
  }
</style>