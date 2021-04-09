<template>
  <v-container>
    <header>
      <div class="placeholder">
        <h1>FORMULÁRIO</h1>
        <p class="label">[Título 3.1-1]</p>
      </div>
    </header>
    <v-form>
      <v-text-field v-model="rgh"
        label="Registro Geral Hospitalar [Dado 3.1-2]"
        required
      ></v-text-field>
      <v-text-field v-model="instituicao"
        label="Instituição Hospitalar [Dado 3.1-3]"
        required
      ></v-text-field>

      <p>Sexo</p>
      <v-radio-group v-model="sex"
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

       <v-text-field v-model="age"
        label="Data de Nascimento [Dado 3.1-3]"
        type="date"
        required
      ></v-text-field>

      <p>Dados da Coleta</p>

      <v-text-field v-model="local"
        label="Local de Coleta [Dado 3.1-3]"
        required
      ></v-text-field>
      <v-text-field v-model="date"
        label="Data de Hoje [Dado 3.1-3]"
        type="date"
        required
      ></v-text-field>
    </v-form>

    <router-link id="next-btn" to="/gather/audios">
      <v-btn
        color="var(--purple-color)"
        class="placeholder"
        @click="submit"
      >
        Próximo
        <p class="label">[Botão 3.1-4]</p>
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: 'Form',
  data: () => ({
    rgh: "",
    instituicao: "",
    sex: "",
    age: "",
    local: "",
    date: "",
  }),
  methods: {
    submit() {
      const data = {
        rgh: this.rgh,
        instituicao: this.instituicao,
        sex: this.sex,
        age: this.age,
        local: this.local,
        date: this.date,
      }
      this.$store.commit('addFormData', data);
      console.log(this.$store.state.data);
    }
  }
}
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .container {
    padding: 24px 18px 18px 18px;
  }
  .container header {
    width: 100%;
    margin-bottom: 0.8rem;
  }
  .container header h1 {
    color: var(--purple-color);
    width: 100%;
    font-weight: normal;
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