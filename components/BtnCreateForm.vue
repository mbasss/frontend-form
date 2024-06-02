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
        console.log(forms);
        console.log(questions);
        this.isLoading = false
      } catch (error) {
        console.log(error.response);
        this.isLoading = false
      }
      // this.$router.push('/form/create')
    }
  }

}
</script>