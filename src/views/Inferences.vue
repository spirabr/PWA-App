<template>
  <div class="table-wrapper">
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
          <td>{{ item.rgh }}</td> 
          <td>{{ item.model }}</td>  
          <td>{{ item.created_in }}</td> 
          <td>{{ item.status }}</td> 
          <td>{{ item.diagnosis }}</td>  
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { requestInferences } from '../services/inference';
import { hasToken } from '../services/auth';

export default {
  data() {
    return {
      headers: [
        {label:'RGH', name:'rgh'},
        {label:'Modelo',name:'model'},
        {label:'Data de Inferência',name:'created_in'},
        {label:'Status',name:'status'},
        {label:'Diagnóstico',name:'diagnosis'}
      ],
      items: [],
      //   { model: 'model_1', rgh: '62536', created_in: '2022-03-21', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_2', rgh: '9393', created_in: '2022-07-21', status: 'completed' ,diagnosis:'negative' },
      //   { model: 'model_1', rgh: '12333', created_in: '2022-08-21', status: 'processing' ,diagnosis:'-' },
      //   { model: 'model_2', rgh: '626', created_in: '2022-02-12', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_1', rgh: '62536', created_in: '2022-03-21', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_2', rgh: '9393', created_in: '2022-07-21', status: 'completed' ,diagnosis:'negative' },
      //   { model: 'model_1', rgh: '12333', created_in: '2022-08-21', status: 'processing' ,diagnosis:'-' },
      //   { model: 'model_2', rgh: '626', created_in: '2022-02-12', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_1', rgh: '62536', created_in: '2022-03-21', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_2', rgh: '9393', created_in: '2022-07-21', status: 'completed' ,diagnosis:'negative' },
      //   { model: 'model_1', rgh: '12333', created_in: '2022-08-21', status: 'processing' ,diagnosis:'-' },
      //   { model: 'model_2', rgh: '626', created_in: '2022-02-12', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_1', rgh: '62536', created_in: '2022-03-21', status: 'completed' ,diagnosis:'positive' },
      //   { model: 'model_2', rgh: '9393', created_in: '2022-07-21', status: 'completed' ,diagnosis:'negative' },
      //   { model: 'model_1', rgh: '12333', created_in: '2022-08-21', status: 'processing' ,diagnosis:'-' },
      //   { model: 'model_2', rgh: '626', created_in: '2022-02-12', status: 'completed' ,diagnosis:'positive' },
      // ],
      sortDirection: 1,
      sortBy: 'rgh',
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

</style>