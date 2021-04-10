<template>
  <v-container>
    <div class="placeholder">
      <h1>Obrigado por Participar</h1>
    </div>
    <router-link to="/">
      <v-btn
        color="#500486"
        block
        class="back-home placeholder"
      >
        Voltar para o início
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .back-home {
    color: white;
  }
  .container a {
    text-decoration: none;
  }
</style>