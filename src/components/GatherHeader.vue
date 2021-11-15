<template>
  <header>
    <v-row>
      <v-col cols="2" class="d-flex align-center">
        <back-home-button/>
      </v-col>
      <v-col cols="8">
        <h1>{{ title }}</h1>
      </v-col>
    </v-row>
  </header>
</template>

<script>
import BackHomeButton from './BackHomeButton.vue';
export default {
  name: 'GatherHeader',
  props: ['title'],
  components: { BackHomeButton }
};
</script>

<style scoped>
h1 {
  margin: 14px 0;
}
header {
  width: 100% !important;
  padding: 0 22px;
  margin-bottom: 14px;
}
</style>