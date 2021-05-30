<template>
  <v-container>
    <main>
      <h1>obrigado por participar</h1>
    </main>
    <v-btn
      block
      rounded
      large
      color="var(--purple-color)"
      class="back-home"
    >
      voltar para o início
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
  .back-home {
    color: white;
    
    font-weight: bold;
    font-size: 18.5px;
    
    height: 50px;

    align-self: flex-end;
    flex: unset;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    height: 52px;
  }
</style>