<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { patientType: 'PACIENTE', model: 'model_1', rgh: '62536', created_in: '2022-03-21', diagnosis:'positive' },
        { patientType: 'TESTE', model: 'model_2', rgh: '62536', created_in: '2022-07-21', diagnosis:'positive' },
        { patientType: 'PACIENTE', model: 'model_1', rgh: '62536', created_in: '2022-08-21', diagnosis:'positive' },
        { patientType: 'PACIENTE', model: 'model_2', rgh: '62536', created_in: '2022-02-12', diagnosis:'positive' }
      ]
    };
  }
};
</script>