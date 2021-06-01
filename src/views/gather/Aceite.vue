<template>
  <v-container>
    <div class="instruction">
      <h1>termo de participação</h1>
      <p>
        Você está sendo convidado/a participar, como voluntário/a, de um estudo que desenvolve 
        um método automático de detecção de características da voz e da fala. 
        Esse método será de grande relevância para diagnósticos médicos. 
        Maiores detalhes sobre isso poderão ser dados logo na sequência à sua participação. 
        Sendo sua participação voluntária, você poderá desistir da coleta a qualquer momento.
        
        Caso você concorde, iniciaremos a gravação da sua fala. Para isso, é só seguir as instruções
        da coletora ou do coletor. Os dados da sua voz e de sua fala serão analisados, de forma 
        anônima, por pesquisadores da Universidade de São Paulo. Todos os seus dados pessoais 
        estarão anônimos em todos os documentos do estudo.
        
        Você aceita participar do estudo?
      </p>
    </div>

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
    justify-content: space-between;
  }
  h1 {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7% 0;
  }
</style>