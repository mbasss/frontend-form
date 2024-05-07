<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>REGISTER</v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
             label= "Name" 
             required
            />
            <v-text-field
             label= "Email" 
             required
            />
            <v-text-field
             label= "Password" 
             required
            />
            <v-text-field
             label= "Confirm Password" 
             required
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary">Register</v-btn>
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>
          Sudah punya akun? 
          <v-btn 
          text
          plain
          to="/login"
          color="primary"
          :ripple="false"
          class="pl-1"
          >Login</v-btn>
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TestPage',
  layout:  'auth'
}
</script>