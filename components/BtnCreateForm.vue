<template>
  <v-btn
  :loading="isLoading"
  color="primary"
  @click="createNewForm"
  >
    New Form
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async createNewForm() {
      try {
        this.isLoading = true
        const forms = await this.$store.dispatch('forms/store')
        const questions = await this.$store.dispatch('questions/store', forms.data._id)
        this.isLoading = false

        this.$router.push(`/questions/${forms.data._id}`);
      } catch (error) {
        console.log(error.data);
        this.$store.commit('alerts/show', {
          type: 'error',
          show: true,
          message: 'SERVER_ERROR'
        })
        this.isLoading = false
      }
      // this.$router.push('/form/create')
    }
  }

}
</script>