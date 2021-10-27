<template>
  <v-container>
    <header>
      <back-home-button/>
      <div class='placeholder'>
        <h1>formulário</h1>
      </div>
    </header>
    <v-form ref='form'>
      <p>Registro do Paciente</p>
      <v-select
        v-model='form.local'
        :items='hospitals'
        label='Local de coleta'
        :rules='nonEmptyRule'
        solo
        required
      ></v-select>

      <v-text-field 
        class='text-input'
        solo
        v-model='form.rgh'
        :disabled='!form.local'
        :rule='nonEmptyRule'
        persistent-hint
        :hint='validRGH'
        label='Registro Geral Hospitalar'
        required
      ></v-text-field>

      <div class='sexo-input'>
        <p>Sexo</p>
        <v-radio-group 
          v-model='form.sex' 
          :rules='nonEmptyRule'
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
          :rules='nonEmptyRule'
          class='checkboxes'
          row
        >
          <v-radio
            v-for="(option, index) in covidOptions"
            :key='index'
            :label='option'
            :value='apiCovidOptions[index]'
            color='var(--purple-color)'
          ></v-radio>
        </v-radio-group>
      </div>

      <div class='mask-input'>
        <p>O paciente está usando máscara?</p>
        <v-radio-group 
          v-model='form.mask'
          :rules='nonEmptyRule'
          class='checkboxes'
          row
        >
          <v-radio
            v-for="(option, index) in maskOptions"
            :key='index'
            :label='option'
            :value='apiMaskOptions[index]'
            color='var(--purple-color)'
          ></v-radio>
        </v-radio-group>
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
import BackHomeButton from '@/components/BackHomeButton.vue';
import { validateRGH, loadOrRequestHospitals, todaysDate } from './Form.js';
import { maskOptions, apiMaskOptions, covidOptions, apiCovidOptions } from './FormOptions';

export default {
  components: { BackHomeButton },
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
    maskOptions,
    apiMaskOptions,
    covidOptions,
    apiCovidOptions,
    nonEmptyRule: [ v => v.trim() !== '' || 'Preencha este campo' ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.form.date = todaysDate();
        this.$store.commit('addFormData', this.form);
        router.push('/gather/aceite');
      }
    }
  },
  computed: {
    validRGH() {
      return validateRGH(this.form.local, this.form.rgh) ? '' : 'RGH inválido';
    }
  },
  created() {
    loadOrRequestHospitals(this)
      .then(val => {
        this.hospitals = val
          .map(hospital => hospital.hospitalName)
          .filter(hospitalName => hospitalName && hospitalName.trim());
      });
    this.$store.commit('clearPatient');
  },
};
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