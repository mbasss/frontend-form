<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>REGISTER</v-toolbar>

        <v-card-text>
          <v-form ref="form">
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
             @keydown="emailExist = false"
             required
            />
            <v-text-field
             label= "Password" 
             :rules="rules.password"
             v-model="form.password"
             type="password"
             required
            />
            <v-text-field
             label= "Confirm Password"
             :rules="rules.confirmPassword"
             v-model="form.confirmPassword"
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
          >Register</v-btn>
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
      isLoading: false,
      emailExist: false,
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
          val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || 'Email must be valid',
          val => !this.emailExist || 'Email already exist'
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
  },
  methods: {
    async onSubmit() {
      try {
        if(this.$refs.form.validate()) {
          this.isLoading = true;
          const response = await this.$axios.$post('http://localhost:3000/register', this.form);
          if(response.message= 'USER_REGISTER_SUCCESS') {
            // save access token to cookies
            // save refresh token to cookier 
            //  this.$router.push('/dashboard')
            alert();
          }
          this.isLoading = false;
        }
        // this.$router.push('/login')
      } catch (error) {
        if(error.response.data.message == 'EMAIL_ALREADY_EXIST') {
          this.emailExist = true,
          this.$refs.form.validate();
        }

        this.isLoading = false;
      }
    }
  }
}
</script>