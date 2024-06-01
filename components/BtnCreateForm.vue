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
    createNewForm() {
      this.isLoading = true
      // this.$router.push('/form/create')
    }
  }

}
</script>