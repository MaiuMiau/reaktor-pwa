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
              <b-button type="submit" variant="dark">Get emissions</b-button>
                <div class="mt-3" v-if="countryname != '' ">Results for: <h2>{{ countryname }}</h2></div>

                <div id="check_capita" class="checkbox">
                  <label><input type="checkbox" v-model="tableorchart" > Show results in chart</label>
                </div>
          </b-form>
        <br>
        </div>
      </div>

        <div class="bigcontainer" v-if="countryData !='' && tableorchart != true">
          <div class="formcontainer">
            <label><input type="checkbox" v-model="percapita" > Show results per capita</label>
            <b-table bordered small responsive fixed hover :items="countryData" :fields="fields" ></b-table>
          </div>
        </div>
        <div class="bigcontainer" v-if="countryData !='' && tableorchart == true">
          <div class="chartcontainer">
            <Bar v-bind:propsdata="years" v-bind:propsdata2="emissions" />
          </div>
        </div>
    </b-container>
  </div>
</template>


<script>
import Bar from './Bar.vue'
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
  name: 'Form',
  components: {
    Bar
  },
  data () {
  return {
    form: {
      country: "",
    },
    options: [],
    selected: null,
    fields: [{key: 'year', sortable: true}, {key: 'emission', sortable: true}],
    percapita: null,
    tableorchart: false,
    countryname:""
  }
},
// if checkbox is checked emissions will change to percapita
watch: {
   percapita: function () {
     if (this.percapita == true) {
       this.fields.pop()
       this.fields.push({key: 'percapita', sortable: true});
     }
     else if (this.percapita == false){
       this.fields.pop()
       this.fields.push({key: 'emission', sortable: true});
     }
   }
 },
 // call loadCountries function to get options to form datalist
created () {
  this.loadCountries()
  },
  // when submitting the form, call loadEmissions function from store
  methods:{
  onSubmit: function(){
        this.$store.dispatch('loadEmissions', this.form ).then(() => {
        this.countryname = this.form.country
        this.clearCountry()
        })
      },
   clearCountry () {
    this.form.country = ''
  },
  // get a list of countries from API
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
  ...mapGetters(['emissions', 'years', 'countryData'])
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
