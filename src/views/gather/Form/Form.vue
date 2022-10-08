<template>
  <v-container>
    <gather-header title="formulário"/>
    <v-form ref='form'>
      <div>
        <p>{{sampleTypeTitle}}</p>
        <v-radio-group 
          v-model='form.sampleType'
          class='checkboxes'
          row
        >
          <v-radio
            v-for="(option, index) in sampleTypeOptions"
            :key='index'
            :label='option'
            :value='apiSampleTypeOptions[index]'
            color='var(--purple-color)'
            class='inner-checkboxes'
          />
        </v-radio-group>
      </div>

      <div v-if={isInferenceApp}>
        <p>Modelo para Inferência</p>
        <v-select
          v-model='form.model'
          :items='models.map(model => model.name)'
          label='Modelos disponíveis'
          :rules='nonEmptyRule'
          solo
          required
        />
      </div>

      <p>Registro do Participante</p>
      <v-select
        v-model='form.local'
        :items='hospitals'
        label='Local de coleta'
        :rules='nonEmptyRule'
        solo
        required
      />

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
      />

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
          />
          <v-radio
            label='Feminino'
            value='Feminino'
            color='var(--purple-color)'
          />
        </v-radio-group>
      </div>

      <p>Idade</p>
      <v-text-field 
        class='text-input'
        type='number'
        label='Em anos'
        solo
        v-model='form.age'
      />

      <div class='covid-input'>
        <p>Já testou positivo para COVID-19?</p>
        <v-radio-group 
          v-model='form.covid.value'
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
          />
        </v-radio-group>

        <div
          v-if="form.covid.value === 'TRUE'"
          class='d-flex flex-column'
        >
          <p>Quando você recebeu o diagnóstico?</p>
          <v-date-picker
            v-model="form.covid.lastPositiveDiagnoseDate"
            color='var(--purple-color)'
          />

          <p>Foi hospitalizado?</p>
          <v-radio-group 
          v-model='form.covid.hospitalized'
          class='checkboxes'
          row
          >
            <v-radio
              label='Sim'
              :value='true'
              color='var(--purple-color)'
            />
            <v-radio
              label='Não'
              :value='false'
              color='var(--purple-color)'
            />
          </v-radio-group>

          <div v-if="form.covid.hospitalized">
            <p>Quando foi internado?</p>
            <v-date-picker
              v-model="form.covid.hospitalizationStart"
              color='var(--purple-color)'
            />
            <p>Quando recebeu alta?</p>
            <v-date-picker
              v-model="form.covid.hospitalizationEnd"
              :min='form.covid.hospitalizationStart'
              color='var(--purple-color)'
            />
          </div>
        </div>
      </div>

      <div class='mask-input'>
        <p>Uso de máscara no momento da coleta:</p>
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

      <p>SPO<sub>2</sub></p>
      <v-text-field 
        class='text-input'
        type='number'
        label='Saturação de oxigênio em porcentagem'
        solo
        v-model='form.oxygenSaturation'
      />

      <p>BPM</p>
      <v-text-field 
        class='text-input'
        type='number'
        label='Batimentos por minuto'
        solo
        v-model='form.bpm'
      />

      <p>Frequência Respiratória</p>
      <v-text-field 
        class='text-input'
        type='number'
        label='Respirações por minuto'
        solo
        v-model='form.respiratoryFrequency'
      />

      <p>Está internado por insuficiência respiratória?</p>
      <v-radio-group 
        v-model='form.internedByRespiratoryInsufficiency.value'
        class='checkboxes'
        row
      >
        <v-radio
          v-for="(option, index) in internationReasonOptions"
          :key='index'
          :label='option'
          :value='apiInternationReasonOptions[index]'
          color='var(--purple-color)'
        ></v-radio>
      </v-radio-group>

      <div class="internation-type" v-if="form.internedByRespiratoryInsufficiency.value === 'TRUE'">
        <p>Enfermaria ou UTI?</p>
        <v-radio-group 
          v-model='form.internedByRespiratoryInsufficiency.location'
          class='checkboxes'
          row
        >
          <v-radio
            v-for="(option, index) in internationLocationOptions"
            :key='index'
            :label='option'
            :value='apiInternationLocationOptions[index]'
            color='var(--purple-color)'
          ></v-radio>
        </v-radio-group>
      </div>

      <p>CID</p>
      <v-text-field 
        class='text-input'
        label='Código internacional da Doença'
        solo
        v-model='form.cid'
      />
    </v-form>

    <v-btn
      rounded
      color='var(--purple-color)'
      @click='submit'
    >
      avançar
    </v-btn>
  </v-container>
</template>

<script>
import router from '@/router';
import GatherHeader from '@/components/GatherHeader.vue';
import { hasToken } from '@/services/auth';
import { validateRGH, loadOrRequestHospitals, loadOrRequestModels, todaysDate, isInferenceApp} from './Form.js';
import { 
  maskOptions, 
  apiMaskOptions, 
  covidOptions, 
  apiCovidOptions, 
  sampleTypeOptions, 
  apiSampleTypeOptions,
  internationReasonOptions,
  apiInternationReasonOptions,
  internationLocationOptions,
  apiInternationLocationOptions,
} from './FormOptions';

export default {
  components: { GatherHeader },
  name: 'Form',
  data: () => ({
    form: isInferenceApp() ? 
      {
        model:'',
        rgh: '',
        local: '',
        sex: '',
        covid: {
          value: '',
          lastPositiveDiagnoseDate: '',
          hospitalized: false,
          hospitalizationStart: undefined,
          hospitalizationEnd: undefined,
        },
        mask: '',
        date: '',
        oxygenSaturation: undefined,
        bpm: undefined,
        age: undefined,
        internedByRespiratoryInsufficiency: {
          value: false,
          location: ''
        },
        cid: '',
        sampleType: 'PATIENT',
        respiratoryFrequency: undefined,
      }:
      {
        rgh: '',
        local: '',
        sex: '',
        covid: {
          value: '',
          lastPositiveDiagnoseDate: '',
          hospitalized: false,
          hospitalizationStart: undefined,
          hospitalizationEnd: undefined,
        },
        mask: '',
        date: '',
        oxygenSaturation: undefined,
        bpm: undefined,
        age: undefined,
        internedByRespiratoryInsufficiency: {
          value: false,
          location: ''
        },
        cid: '',
        sampleType: 'PATIENT',
        respiratoryFrequency: undefined,
      },
    hospitals: [],
    models:[],
    maskOptions,
    apiMaskOptions,
    covidOptions,
    apiCovidOptions,
    sampleTypeOptions,
    apiSampleTypeOptions,
    internationReasonOptions,
    apiInternationReasonOptions,
    internationLocationOptions,
    apiInternationLocationOptions,
    nonEmptyRule: [ v => v.trim() !== '' || 'Preencha este campo' ],
    sampleTypeTitle:isInferenceApp() ? 'Tipo de Inferência' : 'Tipo de Coleta',
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
    if(!hasToken(this)){
      this.$router.push('/signin');
    }
    loadOrRequestHospitals(this)
      .then(val => {
        this.hospitals = val
          .map(hospital => hospital.hospitalName)
          .filter(hospitalName => hospitalName && hospitalName.trim());
      });
    if(isInferenceApp()){
      loadOrRequestModels(this)
        .then(models => {
          this.models = models;
        });
    }
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
  .inner-checkboxes {
    margin-bottom: 10px;
  }
  .v-btn {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
  }
  .v-btn:not(.v-btn--round).v-size--default {
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