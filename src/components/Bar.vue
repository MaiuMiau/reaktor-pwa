<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    name: 'Bar',
    props:['propsdata', 'propsdata2'],
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.propsdata2,
          datasets: [
            {
              label: 'Co2 Emissions',
              backgroundColor: '#a2bf6e',
              data: this.propsdata
            }
          ]
        }
      },
      
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
