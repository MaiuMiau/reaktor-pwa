<template>
  <div class="bigcontainer">
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
    props:['yearsdata', 'propsCountry1','propsCountry2'],
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
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
<style lang="scss" >

.formcontainer{
  padding-top: 15px;
  height: 100%;
  width: 100%;
  max-width: 500px;
  min-width: 100px;
  display: inline-block;
}
.chartcontainer{
  padding-top: 15px;
  height: 100%;
  width: 100%;
  max-width: 570px;
  min-width: 100px;
  display: inline-block;

}
.bigcontainer{
  height: 100%;
  width: 100%;
  max-width: 800px;
  min-width: 100px;
  display: inline-block;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 12px 18px;
  box-shadow: 3px 3px 3px 6px rgba(black, 0.1);
  background-color: rgba(white, 0.93);

}
  .small {
    max-width: 750px;
    margin:  10px auto;
  }
</style>
