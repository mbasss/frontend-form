
import Toolbar from '../../components/Toolbar.vue';
<template>
  <div>
    <v-container
    fluid
    class="pa-0"
    >
    <Toolbar class="mb-5" />
  </v-container>

  <v-container>
    <v-row>
      <v-col md="8" offset-md="2" sm="10" offset-sm="1 ">
        <v-card class="card-border-top">
          <v-card-text>
            <QuestionTitle class="text-h5" />
            <QuestionDescription />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <QuestionCard :formId="formId" />

    <v-row>
      <v-col md="8" offset-md="2" sm="10" offset-sm="1" class="d-flex">
        <v-spacer></v-spacer>
        <QuestionBtnAdd :formId="formId" />
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  async asyncData({ params }) {
    try {
      if(!params.id) {
        throw {
          message: 'FORM_ID_EMPTY'
        }
      }

      return { formId: params.id }
    } catch (error) {
      redirect('/404')
      return false
    }
  },
  methods: {
    async fetch() {
      try {
        const response = await this.$store.dispatch('forms/show', this.formId)
        if(!response)  throw { message: 'FORM_NOT_FOUND' }
        
        // jika berhasil membuat forms lalu set questions
        if(response.data.questions.length > 0) {
          this.$store.commit('questions/set', response.data.questions)
        }

        return response
      } catch (error) {
        if(error.response){
          this.$nuxt.error({
            statusCode: error.response.status,
            customMessage: error.response.data.message
          })
        } else {
          this.$store.commit('alerts/show', {
            type: 'error',
            message: this.$t('SERVER_ERROR')
          })
        }
      }
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>