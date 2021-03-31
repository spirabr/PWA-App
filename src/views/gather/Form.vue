<template>
  <v-container>
    <header>
      <div class="placeholder">
        <h1>Formulário</h1>
        <p class="label">[Título 3.1-1]</p>
      </div>
      <hr>
    </header>
    <v-form>
      <v-text-field
        label="Registro Geral Hospitalar [Dado 3.1-2]"
        required
      ></v-text-field>
      <v-text-field
        label="Instituição Hospitalar [Dado 3.1-3]"
        required
      ></v-text-field>

      <p>Sexo</p>
      <v-radio-group 
        class="checkboxes"
        row
      >
        <v-radio
          label="Masculino"
        ></v-radio>
        <v-radio
          label="Feminino"
        ></v-radio>
      </v-radio-group>

      <p>Dados da Coleta</p>

      <v-text-field
        label="Instituição Hospitalar [Dado 3.1-3]"
        required
      ></v-text-field>
      <v-text-field
        label="Data de Hoje [Dado 3.1-3]"
        type="date"
        required
      ></v-text-field>
    </v-form>

    <router-link id="next-btn" to="/gather/audios">
      <v-btn
        color="#500486"
        class="placeholder"
      >
        Próximo
        <p class="label">[Botão 3.1-4]</p>
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .container header {
    width: 100%;
    margin-bottom: 0.8rem;
  }
  .container header h1 {
    width: 100%;
    text-align: center;
  }
  .v-form {
    width: 100%;
    height: 100%;
  }
  .checkboxes {
    display: flex;
    justify-items: center;
    align-items: center;
  }
  .container .next-btn {
    justify-self: flex-end;
  }
  #next-btn {
    height: 4rem;
    width: 100%;
    align-self: flex-start;
    justify-self: flex-start;

    text-decoration: none;
  }
  .v-btn {
    height: 4rem;
    width: 100%;

    color: white;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: inherit;
  }
</style>