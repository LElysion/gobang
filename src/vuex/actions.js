// import Vue from 'vue'

export default {
  getVersionAction ({commit}) {
    commit('getVersion', new Date())
  },
  setPieceAction ({commit}, data) {
    commit('setPiece', data)
  }
}
