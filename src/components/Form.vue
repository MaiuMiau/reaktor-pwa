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
        </div>
      </div>
            <Chart v-if="countryEmissions.country != null && showtableone " v-bind:yearsdata="years" v-bind:propsCountry1="countryEmissions" />
            <Chart v-if="comparisonData[1] && showtabletwo " v-bind:yearsdata="years" v-bind:propsCountry1="comparisonData[0]" v-bind:propsCountry2="comparisonData[1]" />
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
      country2: "",
    },
    options: [],
    selected: null,
    showtableone: true,
    showtabletwo: false
  }
},
 // call loadCountries function to get options to form datalist
created () {
  this.loadCountries()
  },
  // when submitting the form, call loadEmissions function from store
  methods:{
  onSubmit: function(){
    // if two countries are selected call compareEmissions
    if(this.form.country2 != "" && this.form.country != "") {
      this.$store.dispatch('compareEmissions', this.form ).then(()  => {
        this.showtableone = false
        this.showtabletwo = true
      })
    } else {
      // if one country is selected call loadEmissions
        this.$store.dispatch('loadEmissions', this.form ).then(() => {
          this.showtabletwo = false
          this.showtableone = true
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
</style>
