<template>
  <v-container>
    <header>
      <div class="placeholder">
        <h1>FORMULÁRIO</h1>
      </div>
    </header>
    <v-form ref="form">
      <v-text-field 
        solo
        v-model="rgh" 
        :rules="nonEmpty"
        label="Registro Geral Hospitalar"
        required
      ></v-text-field>
      <v-text-field 
        solo
        v-model="local" 
        :rules="nonEmpty"
        label="Local de Coleta"
        required
      ></v-text-field>

      <div>
        <p>Sexo</p>
        <v-radio-group v-model="sex" :rules="sexFormat"
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

        <v-text-field
          solo
          type="date"
          v-model="date" 
          :rules="nonEmpty"
        ></v-text-field>
      </div>
    </v-form>
    <v-btn
      id="next-btn"
      color="var(--purple-color)"
      @click="submit"
    >
      avançar
    </v-btn>
  </v-container>
</template>

<script>
import router from '@/router';
export default {
  name: 'Form',
  data: () => ({
    rgh: "",
    local: "",
    sex: "",
    date: "",
    nonEmpty: [
      v => !!v.trim() != "" || "Preencha este campo" 
    ],
    sexFormat: [
      v => v !== undefined || "Preencha este campo"
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const data = {
          rgh: this.rgh,
          local: this.local,
          sex: this.sex ? "F" : "M",
          date: this.date,
        }
        this.$store.commit('addFormData', data);        
        router.push('/gather/audios');
      }
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
  }
  .v-label label {
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
    width: 100%;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    width: 100%;
    height: 4rem;
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