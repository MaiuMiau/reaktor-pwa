<template>
  <div>
    <b-container >
      <h1>Co2 Emissions</h1>
      <div class="formcontainer">

        <b-form @submit.stop.prevent="onSubmit()"  >
          <label name="form"></label>
          <div>
            <b-form-input placeholder="Enter or Search Country" v-model="form.country" list="my-list-id"></b-form-input>
             <datalist id="my-list-id">
                 <option v-for="country in options">{{ country  }}</option>
             </datalist>
            <div class="mt-3">Selected: <strong>{{ form.country }}</strong></div>
          </div>
            <br>
            <b-button type="submit" variant="dark">Get emissions</b-button>
        </b-form>
        <br>
        <div id="check_capita" class="checkbox">
          <label><input type="checkbox" v-model="percapita" >Per capita</label>
        </div>

        <div v-if="emissions != '' ">
          <b-table bordered small responsive :items="emissions.results" :fields="fields"></b-table>
        </div>
          <Bar v-bind:propsdata="this.emissions.emissons" v-bind:propsdata2="this.emissions.years" />
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
    fields: ['year', 'emission'],
    percapita: null,
     emissionstable:[],
    // countries:[],
    // emissiondatas:[]

  }
},
// if checkbox is checked emissions will change to percapita
watch: {
   percapita: function () {
     if (this.percapita == true) {
       this.fields.pop()
       this.fields.push('percapita');
     }
     else if (this.percapita == false){
       this.fields.pop()
       this.fields.push('emission');
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
  ...mapGetters(['emissions'])
}
}
</script>
<style lang="scss" >

.formcontainer{
  height: 100%;
  width: 100%;
  max-width: 800px;
  min-width: 100px;
  display: inline-block;
  border-radius: 5px;
  // border-style: solid;
  // border-width: 2px;
  // border-color: black;
  margin-bottom: 1rem;
  padding: 12px 18px;
  box-shadow: 3px 3px 3px 6px rgba(black, 0.1);
  background-color: rgba(white, 0.9);

}
</style>
