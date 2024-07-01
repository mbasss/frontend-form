<template>
  <v-text-field
  filled
  hide-details
  class="creator-input"
  placeholder="Question"
  v-model="localQuestion"
  @input="typing($event)"
  >

  </v-text-field>
</template>

<script>
export default {
  props: ['question', 'formId'],
  data() {
    return {
      timer: null,
      localQuestion: this.question.question
    }
  },
  methods: {
    async typing(value) {
      try {
        clearTimeout(this.timer)

        this.timer = setTimeout(async () => {
          let payload = {
            formId: this.formId,
            questionId: this.question.id,
            form: {
              question: this.localQuestion
            }
          }

          const forms = await this.$store.dispatch('questions/update', payload)
          if(!forms) throw {message: 'ERROR'}
        }, 1000)
      } catch (error) {
        this.$store.commit('alerts/show', {
            type: 'error',
            message: error.response? this.$t(error.response.data.message) : this.$t('SERVER_ERROR')
          })
      }
      
    }
  }
}
</script>