<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="primary" dark>LOGIN</v-toolbar>

        <v-card-text>
          <v-form ref="form">
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
        <p>Nama Kamu : {{ fullname }}</p>
    </div>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from 'vuex';
export default {
  layout:  'auth',

  data() {
    return {
      isLoading: false,
      form: {
        email: '',
        password: ''
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
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
        await this.$store.dispatch('auth/login', this.form)
        this.isLoading = false
      } catch (error) {
        console.log(error.response);
        this.isLoading = false
      }
    }
  },

  computed: {
    ...mapState('auth', ['fullname'])
  }

}
</script>