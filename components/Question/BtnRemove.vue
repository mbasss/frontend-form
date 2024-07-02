<template>
  <v-btn
  icon
  plain
  :ripple="false"
  @click="remove"
  :loading="isDisable"
  >
    <v-icon>mdi-trash-can</v-icon>
  </v-btn>
</template>

<script>
export default {
  props:['formId', 'question'],
  data() {
    return {
      isDisable: false,
    }
  },
  methods: {
    async remove() {
      try {
        this.isDisable = true

        let payload = {
          formId: this.formId,
          questionId: this.question.id
        }

        this.isDisable = false
        const forms = await this.$store.dispatch('questions/remove', payload)
        if(!forms) throw {message: 'ERROR'}
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