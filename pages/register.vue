<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>REGISTER</v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
             label= "Name"
             :rules="rules.fullname"
             v-model="form.fullname"
             required
            />
            <v-text-field
             label= "Email" 
             :rules="rules.email"
             v-model="form.email"
             required
            />
            <v-text-field
             label= "Password" 
             :rules="rules.password"
             v-model="form.password"
             required
            />
            <v-text-field
             label= "Confirm Password"
             :rules="rules.confirmPassword"
             v-model="form.confirmPassword"
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
  layout:  'auth',

  data () {
    return {
      form : {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        fullname: [
          val => !!val || 'Fullname is required'
        ],
        email: [
          val => !!val || 'Email is required',
          val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || 'Email must be valid'
        ],
        password: [
          val => !!val || 'Password is required',
          val => val.length >= 6 || 'Password must be at least 6 characters'
        ],
        confirmPassword: [
          val => !!val || 'Confirm Password is required',
          val => val === this.form.password || 'Password does not match'
        ]
      }
    }
  }
}
</script>