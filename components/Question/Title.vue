<template>
  <v-text-field
  placeholder="Title"
  :value="title"
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
  }
}
</script>