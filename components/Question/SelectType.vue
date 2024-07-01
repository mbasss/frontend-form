<template>
  <v-select
  filled
  hide-details
  class="creator-input"
  v-model="type"
  :items="items"
  @input="typing($event)"
  >
  
    <template v-slot:selection="{ item }">
      <v-icon class="mr-3">{{ item.icon }}</v-icon>
      {{ item.value }}
    </template>
    <template v-slot:item="{ item }">
      <v-icon class="mr-3">{{ item.icon }}</v-icon>
      {{ item.value }}
    </template>
  </v-select>
</template>

<script>
export default {
  props: ['question', 'formId'],
  data() {
    return {
      type: this.question.type,
      items: [
        { value: 'Text', icon: 'mdi-text-short' },
        { value: 'Email', icon: 'mdi-text-short' },
        { value: 'Dropdown', icon: 'mdi-arrow-down-drop-circle-outline' },
        { value: 'Checkbox', icon: 'mdi-check-circle-outline' },
        { value: 'Radio', icon: 'mdi-adjust' },
      ]
    }
  },
  methods: {
    // async typing(value) {
    //   try {
    //     clearTimeout(this.timer)

    //     this.timer = setTimeout(async () => {
    //       let payload = {
    //         formId: this.formId,
    //         questionId: this.question.id,
    //         form: {
    //           question: this.localQuestion
    //         }
    //       }

    //       const forms = await this.$store.dispatch('questions/update', payload)
    //       if(!forms) throw {message: 'ERROR'}
    //     }, 1000)
    //   } catch (error) {
    //     this.$store.commit('alerts/show', {
    //         type: 'error',
    //         message: error.response? this.$t(error.response.data.message) : this.$t('SERVER_ERROR')
    //       })
    //   }
      
    // }
  }
}
</script>