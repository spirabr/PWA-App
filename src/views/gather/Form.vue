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


      <div class="checkboxes">
        <p>Sexo</p>
        <div>
          <v-checkbox
            label="Masculino"
          ></v-checkbox>
          <v-checkbox
            label="Feminino"
          ></v-checkbox>
        </div>
        <v-checkbox
          label="Não desejo declarar"
        ></v-checkbox>
      </div>

    </v-form>

    <router-link id="next-btn" to="/gather/audios">
      <v-btn
        color="#500486"
      >
        [Botão 3.1-4]
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container header {
    width: 100%;
    margin-bottom: 0.8rem;
  }
  .container header h1 {
    width: 100%;
    text-align: center;
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
    margin: 0;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: inherit;
  }
</style>