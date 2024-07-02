<template>
  <v-switch
  v-model="required"
  hide-details
  />
</template>

<script>
export default {
  props:['formId', 'question'],
  data() {
    return {
      required: this.question.required,
    }
  },
  methods: {
    async submit() {
      try {
        let payload = {
          formId: this.formId,
          questionId: this.question.id,
          form: {
            required: this.required
          }
        }
        const forms = await this.$store.dispatch('questions/update', payload)
        if(!forms) throw {message: 'ERROR'}
      } catch (error) {
        this.$store.commit('alerts/show', {
            type: 'error',
            message: error.response? this.$t(error.response.data.message) : this.$t('SERVER_ERROR')
          })
      }
      
    }
  },
  watch: {
    required() {
      this.submit()
    }
  }
}
</script>