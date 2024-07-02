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
    if(payload.form.hasOwnProperty('question')) {
      state.questions[index].question = payload.form.question
    } else if(payload.form.hasOwnProperty('type')) {
      state.questions[index].type = payload.form.type
    } else if(payload.form.hasOwnProperty('options')) {
      state.questions[index].options = payload.form.options
    } else if (payload.form.hasOwnProperty('required')) {
      state.questions[index].required = payload.form.required
    }
  },
  remove(state, payload) {
    state.questions = state.questions.filter(q => q.id !== payload.questionId)
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
  },
  async remove({commit}, payload) {
    const response = await this.$axios.$delete(`/forms/${payload.formId}/questions/${payload.questionId}`, config)
    
    commit('remove', payload)

    return response
  }
}