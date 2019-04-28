import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const SET_EMISSIONS = 'SET_EMISSIONS'

const store = {
  state: function () {
    let baseState = {
      emissions: []
    }
    return baseState
  },

  mutations: {
    [SET_EMISSIONS]: (state, { emissions }) => {
      state.emissions = emissions
    }
},

  actions: {
  loadEmissions ({ commit }, formData ) {
    alert(formData)
    axios.post('http://localhost:5000/getemissions', { formData }).then((response) => {
      commit(SET_EMISSIONS, {emissions:response.data.data})
    })
  }

},
getters: {
  emissions: state => state.emissions

}


}
export default new Vuex.Store(store)
