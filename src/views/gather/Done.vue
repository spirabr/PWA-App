<template>
  <v-container>
    <div class="placeholder">
      <h1>Obrigado por Participar</h1>
    </div>
    <v-progress-circular
      indeterminate
      v-if="loading"
      color="var(--purple-color)"
    ></v-progress-circular>
    <v-icon
      v-if="!loading"
    >mdi-green-check</v-icon>
    <v-btn
      color="#500486"
      block
      :disabled='loading'
      class="back-home placeholder"
    >
      Voltar para o início
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Done',
  data: () => ({
    saving: true,
  }),
  async created() {
    console.log(this.$store.patient);
    await this.$store.commit('persistData');
  },
  computed: {
    loading() {
      return this.saving;
    }
  }
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