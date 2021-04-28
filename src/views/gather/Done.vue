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
  .container {
    display: flex;
    justify-content: center;
  }
  .container h1 {
    height: 45%;
  }
  .back-home {
    color: white;
    height: 4rem;
    width: 100%;

    display: flex;
    justify-self: flex-start;
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