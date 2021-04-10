<template>
  <v-container>
    <header>
      <div class="placeholder">
        <h1>FORMULÁRIO</h1>
      </div>
    </header>
    <v-form>
      <v-text-field
        label="Registro Geral Hospitalar"
        required
      ></v-text-field>
      <v-text-field
        label="Local de Coleta"
        required
      ></v-text-field>

      <div>
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
      </div>

      <div class="data-input">
        <p>Data de Hoje</p>

        <input type="date">
      </div>
    </v-form>

    <router-link id="next-btn" to="/gather/audios">
      <v-btn
        color="var(--purple-color)"
        class="placeholder"
        @click="submit"
      >
        avançar
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
    }
  }
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
    color: var(--purple-color);
    width: 100%;
    font-weight: normal;
    text-align: center;
    margin-bottom: 1rem;
  }
  .v-form {
    width: 100%;
    height: 100%;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .v-form .v-input {
    height: 80px;
    display: flex;
    align-items: start;
  }
  .v-form .v-text-field {
    font-style: italic;
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
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: inherit;
  }
  .container  .v-input--selection-controls {
    margin-top: 5px;
  }
  .data-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80px;
  }
  .data-input input {
    width: 100%;
  }
  .container {
    padding: 24px 18px 24px 18px;
  }
</style>