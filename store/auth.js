export const state = () => ({
  accessToken: null,
  refreshToken: null,
  fullname: null,
});

export const mutations = {
  setFullname(state, fullname) {
    state.fullname = fullname
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken
  }
}

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.$post('http://localhost:3000/login', payload);

    commit('setAccessToken', response.data.accessToken)
    commit('setRefreshToken', response.data.refreshToken)
    commit('setFullname', response.data.fullname)

    return response
  }
}