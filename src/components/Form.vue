<template>
  <div>
    <b-container >
      <h1>Co2 Emissions</h1>
      <div class="bigcontainer">
        <div class="formcontainer">
          <b-form @submit.stop.prevent="onSubmit()"  >
            <label name="form"></label>
            <div>
              <b-form-input placeholder="Enter or Search Country" v-model="form.country" list="my-list-id"></b-form-input>
               <datalist id="my-list-id">
                   <option v-for="country in options">{{ country  }}</option>
               </datalist>
            </div>
              <br>
            <div>
              <b-form-input placeholder="Enter or Search second Country" v-model="form.country2" list="my-list-id"></b-form-input>
               <datalist id="my-list-id">
                   <option v-for="country in options">{{ country  }}</option>
               </datalist>
            </div>
              <br>
              <b-button type="submit" variant="dark">Get emissions</b-button>
          </b-form>
              <br>
         <label><input type="checkbox" v-model="percapita" > Show results per capita</label>
        </div>
      </div>
            <!-- chart is shown if only one country is selected -->
            <Chart v-if="countryEmissions.country != null && showChartOne " v-bind:yearsdata="years" v-bind:propsCountry1="countryEmissions" />
            <!-- chart is shown if two countries are selected -->
            <Chart v-if="comparisonData[1] && showChartTwo " v-bind:yearsdata="years" v-bind:propsCountry1="comparisonData[0]" v-bind:propsCountry2="comparisonData[1]" />
    </b-container>
  </div>
</template>


<script>
import Chart from './Chart.vue'
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
  name: 'Form',
  components: {
    Chart
  },
  data () {
  return {
    form: {
      country: "",
      country2: ""
    },
    options: [],
    showChartOne: true,
    showChartTwo: false,
    percapita: false
  }
},
watch: {
  // if checkbox is checked emissions will change to percapita
   percapita: function () {
     if (this.percapita == true) {
       // if two countries are selected call compareEmissions
       if(this.form.country2 != "" && this.form.country != "") {
         this.$store.dispatch('compareEmissions', {form:this.form, percapita: this.percapita} ).then(()  => {
           this.showChartOne = false
           this.showChartTwo = true
         })
       } else {
         // if one country is selected call loadEmissions
           this.$store.dispatch('loadEmissions', {form:this.form, percapita: this.percapita} ).then(() => {
             this.showChartTwo = false
             this.showChartOne = true
           })
         }
     }
     else if (this.percapita == false){
       if(this.form.country2 != "" && this.form.country != "") {
         this.$store.dispatch('compareEmissions', {form:this.form, percapita: this.percapita} ).then(()  => {
           this.showChartOne = false
           this.showChartTwo = true
         })
       } else {
         // if one country is selected call loadEmissions
           this.$store.dispatch('loadEmissions', {form:this.form, percapita: this.percapita} ).then(() => {
             this.showChartTwo = false
             this.showChartOne = true
           })
         }
     }
   }
 },
 // call loadCountries function to get options to form datalist
created () {
  this.loadCountries()
  },
  methods:{
  onSubmit: function(){
    // if two countries are selected call compareEmissions
    if(this.form.country2 != "" && this.form.country != "") {
      this.$store.dispatch('compareEmissions', {form:this.form, percapita: this.percapita}  ).then(()  => {
        this.showChartOne = false
        this.showChartTwo = true
      })
    } else {
      // if one country is selected call loadEmissions
        this.$store.dispatch('loadEmissions', {form:this.form, percapita: this.percapita} ).then(() => {
          this.showChartTwo = false
          this.showChartOne = true
        })
      }
    },
    // get a list of countries from API for datalist. Not done in store because gets done only once
  loadCountries() {
        axios.get('http://localhost:5000/getcountries')
          .then((res) => {
            this.options= res.data.countries;
          })
          .catch((error) => {
            console.error(error);
          });
      },
  },
  computed: {
  ...mapGetters(['countryEmissions', 'years', 'comparisonData'])
}
}
</script>
