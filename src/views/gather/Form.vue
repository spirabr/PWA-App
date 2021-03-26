<template>
  <v-container>
    <header>
      <h1>[Título 3.1-1]</h1>
      <hr>
    </header>
    <v-form>
      <v-text-field
        label="[Dado 3.1-2]"
        required
      ></v-text-field>
      <v-text-field
        label="[Dado 3.1-3]"
        required
      ></v-text-field>

      <p>Sexo</p>

      <v-checkbox
        label="Masculino"
      ></v-checkbox>
      <v-checkbox
        label="Feminino"
      ></v-checkbox>
      <v-checkbox
        label="Não desejo declarar"
      ></v-checkbox>

    </v-form>

    <v-btn
      color="#500486"
    >
    <p> [Botão 3.1-4] </p>
    </v-btn>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }
  .container header {
    width: 100%;
    margin-bottom: 0.8rem;
  }
  .container header h1 {
    width: 100%;
    text-align: center;
  }
  .container .v-btn {
    height: 20px;
    width: 100%;

    justify-self: flex-end;
  }
  .v-btn p {
    color: white;
    font-weight: bold;
    margin: 0;
  }
</style>