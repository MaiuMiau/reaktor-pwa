<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
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
    watch: {
    propsdata: function () {
      this.fillData()
    }
  },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.propsdata,
          datasets: [
            {
              label: 'Co2 Emissions',
              backgroundColor: '#abb5a4',
              data: this.propsdata2
            }
          ]
        }
      },

    }
  }
</script>

<style>
  .small {
    max-width: 750px;
    margin:  10px auto;
  }
</style>
