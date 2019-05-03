<template>
  <div>
    <b-container >
      <div class="formcontainer">
    <h2>co2emissions</h2>

      <b-form @submit.stop.prevent="onSubmit()"  >
        <label name="form"></label>
        <div>
          <b-form-select  v-model="form.country" :options="options" class="mb-3">
             <option value="" disabled selected>Select a country</option>
          </b-form-select>
          <div class="mt-3">Selected: <strong>{{ form.country }}</strong></div>
        </div>
          <br>
          <b-form-checkbox
                id="checkbox-1"
                v-model="form.perCapita"
                name="checkbox-1"
                value="show"
                unchecked-value="dontshow"
          >
                Emissions per capita
          </b-form-checkbox>
          <br>
          <b-button type="submit" variant="dark">Get emissions</b-button>
      </b-form>
      <br>
    </div>
    <div v-if="emissions != '' ">
      <b-table striped hover :items="emissions" :fields="fields"></b-table>
    </div>
    </b-container>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
  name: 'Form',
  data () {
  return {
    form: {
      country: ""
    },
    options: [],
    selected: null,
    fields: ['year', 'emission', 'percapita'],
    perCapita: "dontshow"
  }
},
created () {
  this.loadCountries()
  },
  methods:{
  onSubmit: function(){
        this.$store.dispatch('loadEmissions', this.form )
      },
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
  max-width: 500px;
  min-width: 100px;
  display: inline-block;
  border-radius: 24px;
  // border-style: solid;
  // border-width: 2px;
  // border-color: black;
  margin-bottom: 1rem;
  padding: 12px 18px;
  box-shadow: 3px 3px 3px 6px rgba(black, 0.1);
  //background-color: #e3f5f9;

}
</style>
