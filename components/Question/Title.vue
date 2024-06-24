<template>
  <v-text-field
  placeholder="Title"
  :value="title"
  @input="typing($event)"
  >

  </v-text-field>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState('forms',['id', 'title'])
  },
  methods: {
    typing(value) {
      try {
        let payload = {
          formId: this.id,
          title: value
        }
        const forms = this.$store.dispatch('forms/update', payload)
        console.log(forms);        
      } catch (error) {
        console.error(error);
      }
      
    }
  }
}
</script>