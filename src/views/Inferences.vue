<template >
  <v-container>
    <gather-header title="inferências"/>
    <div v-if="!isMobile()" class="table-wrapper">
      <table class="table table-striped">
        <thead>
          <tr>
            <th v-for="head in headers" @click="sort(head.name)" :key="head.name">
              {{ head.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in sortedProperties" :key="i">
            <td>{{ item.local }}</td>
            <td>{{ item.rgh }}</td> 
            <td>{{ item.model }}</td>  
            <td>{{ item.created_in }}</td> 
            <td>{{ item.status }}</td> 
            <td>{{ item.diagnosis }}</td>  
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <v-card elevation="2">
        <v-select class="mobile-select"
          label="Ordenar por (selecione novamente para inverter a ordem)"
          :items="headers"
          item-text="text"
          item-value="name"
          color="var(--purple-color)"
          @input="sort"
          >
        </v-select>
        <div v-for="(item,i) in sortedProperties" :key="i" class="mobile-card-div">
          <v-card 
            class="mobile-card"
            elevation="1"
          >
            <v-card-text class="mobile-card-text">
              <div v-for="(header,j) in headers" :key="j">
                <p v-if="(header.name!='diagnosis' && header.name!='status')">{{header.label}}: {{item[header.name]}}</p>
                <p v-else class="bolder-header">{{header.label}}: {{item[header.name]}}</p>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { requestInferences } from '../services/inference';
import { hasToken } from '../services/auth';
import GatherHeader from '@/components/GatherHeader.vue';

export default {
  components: { GatherHeader },
  data() {
    return {
      headers: [
        {label:'Hospital', name:'local', text:'Hospital'},
        {label:'RGH', name:'rgh',text:'RGH'},
        {label:'Modelo',name:'model', text:'Modelo'},
        {label:'Data da Inferência',name:'created_in',text:'Data da Inferência' },
        {label:'Status',name:'status',text:'Status'},
        {label:'Diagnóstico',name:'diagnosis',text:'Diagnóstico'}
      ],
      items: [],
      sortDirection: 1,
      sortBy: 'local',
    };
  },
  computed: {
    sortedProperties() {
      const direction = this.sortDirection;
      const head = this.sortBy;
      return this.items.slice().sort(this.sortMethods(head, direction));
    }
  },
  methods: {
    sort(head) {
      this.sortBy = head;
      this.sortDirection *= -1;
    },
    sortMethods(head, direction) {
      return direction === 1 ? 
        (a, b) => b[head] > a[head] ? -1 : a[head] > b[head] ? 1 : 0 : 
        (a, b) => a[head] > b[head] ? -1 : b[head] > a[head] ? 1 : 0;
    },
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if(!hasToken(this)){
      this.$router.push('/signin');
    }
    requestInferences(this)
      .then(inferences => {
        this.items = inferences;
      });
  },
};
</script>

<style>
*{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    background: rgba( 71, 147, 227, 1);
}
h2{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    padding: 30px 0;
}

/* Table Styles */

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 2px 5px rgb(60, 7, 131);
    min-width: 400px;
}

.table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.table th {
  cursor: pointer;
}

.table td, .table th {
    text-align: center;
    padding: 8px;
}

.table td {
    font-size: 15px;
}

.table thead th {
    color: #ffffff;
    background-color: rgba(124, 31, 244, 0.7);
    font-size: 20px;
}

.table thead th:nth-child(odd) {
    color: #ffffff;
    background-color: rgba(63, 31, 105, 0.7);
}

.table tr:nth-child(even) {
    background: #F8F8F8;
}

/* mobile css */

.mobile-header {
    font-size: 23px;
    text-align: left;
    font-weight: bold;
    font-style: normal;
    color:var(--purple-color);
}

.mobile-select {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.mobile-card-text {
    color: #000000;
    background-color: rgba(245, 245, 245, 0.7);
    font-size: 15px;
}

.mobile-card-div {
    padding-bottom: 10px;
    padding-top: 10px;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

.bolder-header {
  padding-top: 5px;
  font-weight: bold;
}

</style>