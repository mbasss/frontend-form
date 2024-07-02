<template>
<div>
  <v-row
  v-for="(question, i) in questions"
  :key="i">
    <v-col md="8" offset-md="2" sm="10" offset-sm="1">
      <v-card>
        <v-card-text background="white" class="pb-0">
          <v-row>
            <v-col cols="12" sm="4">
              <QuestionInput :question="question" :formId="formId"/>
            </v-col>
            <v-col cols="12" sm="4">
              <QuestionSelectType :question="question" :formId="formId"/>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider class="mx-4 mb-0"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <QuestionBtnRemove :question="question" :formId="formId" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default({
  props: ['formId'],
  computed: {
    ...mapState('questions', ['questions'])
  }
})
</script>