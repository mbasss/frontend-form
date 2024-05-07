<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>LOGIN</v-toolbar>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
             label= "Email"
             required
            />
            <v-text-field
             label= "Password" 
             type="password"
             required
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn 
          :loading="isLoading"
          color="primary" 
          @click="onSubmit"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>
          Belum punya akun? 
          <v-btn 
          text
          plain
          to="/register"
          color="primary"
          :ripple="false"
          class="pl-1"
          >Register</v-btn>
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout:  'auth',

  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      
    }
  }
}
</script>