<template>
  <v-container>
    <header>
      <div class='placeholder'>
        <h1>formulário</h1>
      </div>
    </header>
    <v-form ref='form'>
      <p>Registro do Paciente</p>
      <v-text-field 
        class='text-input'
        solo
        v-model='form.rgh'
        :rules='nonEmptyRule'
        label='Registro Geral Hospitalar'
        required
      ></v-text-field>

      <v-select
        v-model='form.local'
        :items='hospitals'
        label='Local de coleta'
        solo
        required
      ></v-select>

      <div class='sexo-input'>
        <p>Sexo</p>
        <v-radio-group v-model='form.sex' :rules='radioRule'
          class='checkboxes'
          row
        >
          <v-radio
            label='Masculino'
            value='Masculino'
            color='var(--purple-color)'
          ></v-radio>
          <v-radio
            label='Feminino'
            value='Feminino'
            color='var(--purple-color)'
          ></v-radio>
        </v-radio-group>
      </div>

      <div class='covid-input'>
        <p>Já testou positivo para COVID-19?</p>
        <v-radio-group 
          v-model='form.covid'
          :rules='radioRule'
          class='checkboxes'
          row
        >
          <v-radio
            label='Sim'
            value='Sim'
            color='var(--purple-color)'
          ></v-radio>
          <v-radio
            label='Não'
            value='Não'
            color='var(--purple-color)'
          ></v-radio>
          <v-radio
            label='Não se recorda /
                  Não deseja declarar'
            value='Não se recorda/
                  Não deseja declarar'
            color='var(--purple-color)'
          ></v-radio>
        </v-radio-group>
      </div>

      <div>
        <p>O paciente está usando máscara?</p>
        <v-select
          v-model='form.mask'
          :items='maskTypes'
          solo
          label='Tipo de Máscara'
          required
        ></v-select>
      </div>
    </v-form>

    <v-btn
      block
      rounded
      id='next-btn'
      color='var(--purple-color)'
      @click='submit'
    >
      avançar
    </v-btn>
  </v-container>
</template>

<script>
import router from '@/router';
import axios from 'axios';

async function loadOrRequestHospitals(component) {
  try {
    const newHospitals = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/${process.env.VUE_APP_HOSPITAL_URI}`);
    component.$store.commit('loadHospitals', newHospitals);
    return newHospitals;
  }
  catch {
    return await component.$store.getters.getHospitals;
  }
}

export default {
  name: 'Form',
  data: () => ({
    form: {
      rgh: '',
      local: '',
      sex: '',
      covid: '',
      mask: '',
      date: '',
    },
    hospitals: [],
    maskTypes: ['Nenhuma', 'Sim, Máscara fina (pano, cirúrgica)', 'Sim, Máscara grossa (N-95)'],
    nonEmptyRule: [ v => !!v.trim() != '' || 'Preencha este campo' ],
    radioRule: [ v => v.trim() !== '' || 'Preencha este campo' ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.form.date = this.todaysDate();
        this.$store.commit('addFormData', this.form);
        router.push('/gather/aceite');
      }
    },
    todaysDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      return dd + '/' + mm + '/' + yyyy;
    }
  },
  mounted() {
    loadOrRequestHospitals(this).then(val => {
      if (val && val.map) {
        this.hospitals = val.map(hospital => hospital.name);
      } else {
        this.hospitals = ['Hospital das Clínicas'];
      }
    });
  },
}
</script>

<style scoped>
  p {
    text-align: left;
    font-weight: bold;
    color: var(--purple-color);
  }
  .container header {
    width: 100%;
    margin-bottom: 0.8rem;
  }
  .container header h1 {
    color: var(--purple-color);
    width: 100%;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }
  .v-form {
    width: 100%;
    height: 100%;
    padding-bottom: 1rem;
  }
  .v-label .checkboxes {
    font-style: normal;
  }
  .sexo-input {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .sexo-input p {
    margin: 0;
  }
  .sexo-input label {
    font-style: normal;
  }
  .checkboxes {
    display: flex;
    justify-items: center;
    align-items: center;
  }
  .container .next-btn {
    position: absolute;
    bottom: 4rem;
  }
  .v-btn {
    width: 100%;

    font-size: 1.3rem;
    font-weight: bold;
    color: white;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    width: 100%;
    height: 47px;
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
    padding: 30px 22px;
    height: 100%;
  }
</style>