<template>
  <v-container>
    <header>
      <h1>FORMULÁRIO</h1>
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
  }

  #next-btn {
    height: 4rem;
    width: 100%;
  }

  .v-btn {
    width: 100%;
    font-size: 1.5rem;
    color: white;
  }

  .container  .v-input--selection-controls {
    margin-top: 0.5rem;
  }

  .container {
    padding: 1rem;
  }
</style>