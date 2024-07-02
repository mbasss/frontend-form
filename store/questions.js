const config = {
  headers: {
    Autosave: true
  }
}
export const state = () => ({
  questions: [],
})

export const mutations = {
  set(state, questions) {
    state.questions = questions
  },
  update(state, payload) {
    const index = state.questions.findIndex(q => q.id === payload.questionId)
    state.questions[index].type = payload.form.type
  }
}

export const actions = {
  async store({}, id) {
    const response = await this.$axios.$post(`/forms/${id}/questions`)
    if(!response) {return false}

    return response
  },
  async update({commit}, payload) {
    const response = await this.$axios.$put(`/forms/${payload.formId}/questions/${payload.questionId}`, payload.form, config)
    if(!response) {return false}

    commit('update', payload)
    return response
  }
}