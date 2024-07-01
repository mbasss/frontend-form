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

    return response
  }
}