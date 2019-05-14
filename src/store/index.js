import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)
const SET_YEARS = 'SET_YEARS '
const SET_COUNTRYEMISSIONS = 'SET_COUNTRYEMISSIONS'
const SET_COMPARISONDATA= 'SET_COMPARISONDATA'

const store = {
  state: function () {
    let baseState = {
      countryEmissions: {},
      years:[],
      comparisonData:[],
    }
    return baseState
  },

  mutations: {

    [SET_YEARS]: (state, { years }) => {
      state.years = years
    },
    [SET_COUNTRYEMISSIONS]: (state, { countryEmissions }) => {
      state.countryEmissions = countryEmissions
    },
    [SET_COMPARISONDATA]: (state, { comparisonData }) => {
      state.comparisonData = comparisonData
    }
},

  actions: {
  loadEmissions ({ commit }, formData ) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/getemissions', formData ).then((response) => {
        commit(SET_YEARS, {years:response.data.years})
        commit(SET_COUNTRYEMISSIONS, {countryEmissions:response.data.result})
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },
  compareEmissions ({ commit }, formData ) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/emissionscompare', formData ).then((response) => {
        commit(SET_YEARS, {years:response.data.years})
        commit(SET_COMPARISONDATA, {comparisonData:response.data.results})
        resolve()
    }).catch((err) => {
      reject(err)
    })
    })
  },
},
getters: {
  years: state => state.years,
  countryEmissions: state => state.countryEmissions,
  comparisonData: state => state.comparisonData

}


}
export default new Vuex.Store(store)
