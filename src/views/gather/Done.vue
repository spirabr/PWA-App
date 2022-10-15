<template>
  <v-container>
    <main>
      <h1>obrigado por participar</h1>
      <p>a coleta está salva, para enviar os dados, vá até a aba 
        <strong> 
          <router-link to="/upload"> upload </router-link> 
        </strong> e selecione a coleta a ser enviada</p>
    </main>
    <v-btn
      rounded
      large
      color="var(--purple-color)"
      class="back-home"
      @click="goHome"
    >
      voltar para o início
    </v-btn>
  </v-container>
</template>

<script>
import router from '@/router';
import { hasToken } from '@/services/auth';

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
    },
  },
  async created() {
    if(!hasToken(this)){
      this.$router.push('/signin');
    }
    this.$store.commit('persistData');
    this.saving = false;
  },
  computed: {
    loading() {
      return this.saving;
    }
  }
};
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 30px 22px;
  }
  main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .v-btn {
    text-transform: none;
    letter-spacing: inherit;
    font-weight: bold;
    font-size: 1.3rem;

    color: white;

    display: flex;
    flex: unset;
    max-width: auto;

    border: 2.7px solid;

    background: white;

    width: 100%;
    height: 47px !important;
  }
  main p {
    text-align: center;
  }
  main a {
    text-decoration: none;
    color: black;
  }
</style>