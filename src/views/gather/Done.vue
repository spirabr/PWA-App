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

    <a href=""></a>

    <v-btn
      color="#500486"
      :disabled='loading'
      @click="goHome"
      class="back-home"
    >
      Voltar para o início
    </v-btn>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  name: 'Done',
  data: () => ({
    saving: true,
  }),
  methods: {
    goHome() {
      if (this.saving === false) {
        router.push('/');
      }
    }
  },
  async created() {
    await this.$store.commit('persistData');
    this.saving = false;
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
    height: 4rem;
    width: 100%;

    display: flex;
    justify-self: flex-start;
  }
  .container {
    display: flex;
    flex-direction: column;
  }
</style>