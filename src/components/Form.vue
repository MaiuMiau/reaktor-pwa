<template>
  <div>
    <h2>co2emissions testing form</h2>
    <b-container>
      <b-form @submit.stop.prevent="onSubmit()"  >
        <label name="form"></label>
          <b-form-input
            id="input-1"
            v-model="form.country"
            type="text"
            required
            placeholder="Enter Country">
          </b-form-input>
          <br>
          <b-form-input
            id="input-2"
            v-model="form.year"
            type="text"
            required
            placeholder="Enter year">
          </b-form-input>
          <br>
          <b-button type="submit" variant="primary">Submit</b-button>
          <!--<b-button type="button" @click="getData"> get emissions</b-button> -->

      </b-form>
    </b-container>
    <div v-if="emissions != '' ">
    <p >{{ emissions[1] }}</p>
    <p >{{ emissions[0] }}</p>
    <p >{{ emissions[2] }}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Form',
  data () {
  return {
    form: {
      country: "",
      year: ""
    }
  }
},
  methods:{
  onSubmit: function(){
        this.$store.dispatch('loadEmissions', { country: this.form.country, year: this.form.year })
      },
  },
  computed: {
  ...mapGetters(['emissions'])
}
}
</script>
