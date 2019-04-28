<template>
  <div>
    <h2>co2emissions</h2>
    <div v-if="emissions != '' ">
    <p >{{ emissions[1] }}</p>
    <p >{{ emissions[0] }}</p>
    <p >{{ emissions[2] }}</p>
    </div>
      <b-button type="button" @click="getData"> get emissions</b-button>

  </div>
</template>


<script>
//import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'Emissions',
  data () {
  return {

  }
},
  // async mounted () {
  //   await this.$store.dispatch('loadEmissions')
  // },
  methods:{
    getData: function() {
      this.$store.dispatch('loadEmissions')
    }
  },
  computed: {
  ...mapGetters(['emissions'])
},
  // computed: mapState([
  //   'emissions'
  // ]),
}
</script>
