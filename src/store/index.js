import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const SET_COUNTRY_DATA = 'SET_COUNTRY_DATA'
const SET_YEARS = 'SET_YEARS '
const SET_EMISSIONS = 'SET_EMISSIONS'

const store = {
  state: function () {
    let baseState = {
      emissions: {},
      years:[],
      countryData:[]
    }
    return baseState
  },

  mutations: {
    [SET_COUNTRY_DATA]: (state, { countryData }) => {
      state.countryData = countryData
    },
    [SET_YEARS]: (state, { years }) => {
      state.years = years
    },
    [SET_EMISSIONS]: (state, { emissions }) => {
      state.emissions = emissions
    }
},

  actions: {
  loadEmissions ({ commit }, formData ) {
    axios.post('http://localhost:5000/getemissions', formData ).then((response) => {
      commit(SET_COUNTRY_DATA, {countryData:response.data.results})
      commit(SET_YEARS, {years:response.data.years})
      commit(SET_EMISSIONS, {emissions:response.data.emissons})
    })
  }

},
getters: {
  countryData: state => state.countryData,
  years: state => state.years,
  emissions: state => state.emissions


}


}
export default new Vuex.Store(store)
