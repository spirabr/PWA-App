<template>
  <v-container>
    <h1>termo de participação</h1>
    <p>
      Você está sendo convidado a participar de um estudo para desenvolver um método automático para detectar pessoas que possam evoluir com problemas respiratórios.

      Caso você concorde iremos pedir para que você grave uma ou mais frases pelo computador.

      Os dados de sua voz serão analisados por pesquisadores da Universidade de São Paulo de forma anônima.
                
      Nenhum dado pessoal seu será incluído em nenhum documento do estudo.
    </p>

    <Microphone
      :Reset=false
      @newAudio="saveTermo"
      @ready="nextPage"
    />
  </v-container>
</template>

<script>
import router from '@/router';
import Microphone from '../../components/Microphone';

export default {
  name: 'Aceite',
  components: { Microphone },
  methods: {
    saveTermo(blobURL) {
      this.$store.commit('saveTermo', blobURL);
    },
    nextPage() {
      router.push('./audios');
    },
  }
}
</script>

<style scoped>
  .container {
    padding: 30px 22px;

    display: flex;
    flex-direction: column;
  }
  h1 {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7% 0;
  }
</style>