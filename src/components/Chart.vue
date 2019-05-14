<template>
  <div class="bigcontainer">
    <p>Co2 Emissions in kilotons</p>
      <div class="chartcontainer">
        <div class="small">
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  export default {
    name: 'Chart',
    props:['yearsdata', 'propsCountry1', 'propsCountry2'],
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
    // watches if values will change and calls fillData() function
    watch: {
    propsCountry1: function () {
      this.fillData()
    },
     propsCountry2: function () {
       this.fillData()
     }
  },
     mounted () {
       this.fillData()
     },
    methods: {
      fillData () {
        // if two countries are selected
        if(this.propsCountry2 != null && this.propsCountry1 != null){
          this.datacollection = {
            labels: this.yearsdata,
            datasets: [
              {
                label: this.propsCountry1.country,
                backgroundColor: 'rgb(171, 181, 164,0.8)',
                data: this.propsCountry1.emissions
              },
              {
                label: this.propsCountry2.country,
                backgroundColor: 'rgb(99, 27, 45,0.8)',
                data: this.propsCountry2.emissions
              }

            ]
          }
        }else {
          // if one country is selected
          this.datacollection = {
            labels: this.yearsdata,
            datasets: [
              {
                label: this.propsCountry1.country,
                backgroundColor: 'rgb(171, 181, 164,0.8)',
                data: this.propsCountry1.emissions
              }
            ]
          }
        }
      },
    }
  }
</script>
